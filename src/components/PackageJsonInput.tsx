import { Dispatch, SetStateAction } from "react";

interface PackageJsonInputProps {
  packageJson: string;
  setPackageJson: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function PackageJsonInput({
  packageJson,
  setPackageJson,
  setError,
}: PackageJsonInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPackageJson(e.target.value);
    setError(null); // Clear any errors when the user types
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-semibold">Paste package.json</label>
      <textarea
        className="border rounded px-4 py-2 text-white bg-black w-full min-h-[200px] resize-y"
        value={packageJson}
        onChange={handleChange}
        placeholder='Paste your package.json here...'
      />
    </div>
  );
}
