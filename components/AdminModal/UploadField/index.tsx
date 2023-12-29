"use client";

import { Input } from "@/components/ui/input";
import { useUpload } from "@/hooks/useUpload";
import { FC } from "react";

interface IUploadField {
  folder?: string;
  value?: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
}

const UploadField: FC<IUploadField> = ({
  onChange,
  placeholder,
  folder,
  value,
}) => {
  const { uploadFile } = useUpload(onChange, folder);

  return (
    <>
      <Input
        id="image"
        placeholder={placeholder}
        value={value}
        type="file"
        onChange={uploadFile}
      />
    </>
  );
};

export default UploadField;
