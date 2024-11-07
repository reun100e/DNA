import { FC, useState, ChangeEvent } from 'react';
import '../../styles/ProfilePictureUpload.css';

interface ProfilePictureUploadProps {
  profilePicture: string;
  onUpload: (file: File) => void;
}

const ProfilePictureUpload: FC<ProfilePictureUploadProps> = ({
  profilePicture,
  onUpload,
}) => {
  const [preview, setPreview] = useState(profilePicture);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="profile-picture-upload">
      <img src={preview} alt="Profile" className="profile-picture" />
      <input type="file" onChange={handleFileChange} className="upload-input" />
    </div>
  );
};

export default ProfilePictureUpload;
