import React, { useRef } from "react";

interface UploadFormProps {
  setPackageJson: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadForm: React.FC<UploadFormProps> = ({ setPackageJson, setError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const json = JSON.parse(e.target.result as string);
          setPackageJson(JSON.stringify(json, null, 2));
          setError(null);
        } catch {
          setError("Invalid JSON file. Please upload a valid package.json.");
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="border rounded px-4 py-2 text-white"
      />
    </div>
  );
};

export default UploadForm;
