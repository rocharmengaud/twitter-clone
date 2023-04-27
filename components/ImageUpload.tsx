import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      // This onload event listener is attached to the FileReader object, which will be triggered when the file has been read successfully.
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer',
      })}
    >
      {/* This line uses the spread operator (...) to pass all of the properties and event handlers returned by the getInputProps 
      function as props to the input element. This is used to capture the file upload when the user selects or drops a file. */}
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};
