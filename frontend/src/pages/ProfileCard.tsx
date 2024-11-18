import React from "react";
import { useAuth } from "../context/AuthContext";
import EditableField from "@/components/Dashboard/EditableField";
import { BadgeCheck, BadgeX } from "lucide-react";
import { ProPic } from "@/components/ProPic";

const ProfileCard: React.FC = () => {
  const { isAuthenticated, user, updateUser } = useAuth();

  if (!isAuthenticated || !user) return null;

  const handleFieldUpdate = (field: keyof typeof user, value: string) => {
    updateUser({ [field]: value });
  };

  return (
    <div className="profile-card p-6 max-w-md mx-auto bg-popover rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <ProPic size="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-gray-500">{user.bio || "DNA Member"}</p>
      </div>
      {/* 
      <span
        className={`px-2 py-1 text-sm rounded ${
          user.is_email_verified
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {user.is_email_verified ? "Verified" : "Not Verified"}
      </span> */}

      <div className="space-y-4">
        <EditableField
          label="First Name"
          value={user.first_name}
          onSave={(newValue) => handleFieldUpdate("first_name", newValue)}
          isEditable={true}
          icon={""}
          iconLabel={""}
        />
        <EditableField
          label="Last Name"
          value={user.last_name}
          onSave={(newValue) => handleFieldUpdate("last_name", newValue)}
          isEditable={true}
          icon={""}
          iconLabel={""}
        />
        <EditableField
          label="Email"
          value={user.email}
          onSave={(v) => handleFieldUpdate("email", v)}
          isEditable={true}
          icon={
            user.is_email_verified ? (
              <BadgeCheck color="darkgreen" />
            ) : (
              <BadgeX color="darkred" />
            )
          }
          iconLabel={user.is_email_verified ? "Verified" : "Not Verified"}
        />{" "}
        <EditableField
          label="Phone Number"
          value={user.phone_number}
          onSave={(newValue) => handleFieldUpdate("phone_number", newValue)}
          isEditable={!user.is_phone_verified}
          icon={user.is_phone_verified ? <BadgeCheck color="darkgreen" /> : ""}
          iconLabel={user.is_phone_verified ? "Verified" : "Not Verified"}
        />
        <div className="field">
          <label className="block text-sm font-medium">DNA ID</label>
          <div className="flex items-center mt-2">
            <span>{user.dna_id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
