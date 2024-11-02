import { FC, useState, ChangeEvent } from 'react';

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
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <img
        src={preview}
        alt="Profile"
        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
      />
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ProfilePictureUpload;
