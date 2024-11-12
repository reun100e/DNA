import { FC, useState, useEffect, ChangeEvent } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';

interface ProfilePictureUploadProps {
  profilePicture: string; // URL of the initial profile picture from the database
  onUpload: (file: File) => void;
}

const ProfilePictureUpload: FC<ProfilePictureUploadProps> = ({
  profilePicture,
  onUpload,
}) => {
  const [preview, setPreview] = useState(profilePicture);

  useEffect(() => {
    // Update the preview when profilePicture prop changes (e.g., when fetched from database)
    setPreview(profilePicture);
  }, [profilePicture]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file)); // Update preview with selected file
      onUpload(file); // Trigger the upload function
    }
  };

  return (
    <div className="relative group flex flex-col items-center">
      <img
        src={preview || '/path/to/default/avatar.png'} // Fallback to default avatar if preview is empty
        alt="Profile"
        className="h-24 w-24 rounded-full object-cover shadow-lg transition-transform duration-200 ease-in-out transform group-hover:scale-105"
      />
      <label htmlFor="file-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <CameraIcon className="w-8 h-8 text-white" />
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfilePictureUpload;
