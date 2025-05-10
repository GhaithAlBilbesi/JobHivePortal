import React, { useState, useEffect } from 'react';
import { useUser, User } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'wouter';

/**
 * Profile Page Component
 * 
 * Allows users to view and edit their profile information
 * Provides sections for personal details, skills, and account settings
 */
const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useUser();
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProfileImagePreview(user.profilePicture || null);
      
      // Additional fields that would come from a more complete user profile
      setTitle(user.title || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
      setLocation(user.location || '');
      setWebsite(user.website || '');
      setSkills(user.skills || []);
    }
  }, [user]);

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the profile update object
    const profileData: Partial<User> = {
      name,
      title,
      bio,
      email,
      phone,
      location,
      website,
      skills
    };
    
    // TODO: In a real app, we would handle the profile image upload here
    // and get a URL back from the server to store
    
    try {
      // Call the updateProfile method from the context
      const success = await updateProfile(profileData);
      
      if (success) {
        // Exit edit mode
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('There was a problem updating your profile. Please try again.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('An error occurred while updating your profile.');
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) {
    return <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 text-center">Loading profile...</div>;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Cancel Editing
            </Button>
          )}
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            {isEditing ? (
              // Edit Profile Form
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                      <div className="flex flex-col items-center">
                        <div 
                          onClick={() => document.getElementById('profile-pic-input')?.click()}
                          className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#F6C500] transition-colors"
                        >
                          {profileImagePreview ? (
                            <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <Avatar className="w-full h-full">
                              <AvatarFallback>{getUserInitials()}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <input
                          id="profile-pic-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <button
                          type="button"
                          className="mt-2 text-sm text-[#F6C500] hover:underline"
                          onClick={() => document.getElementById('profile-pic-input')?.click()}
                        >
                          Change photo
                        </button>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Software Engineer, Student"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                    
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <div>
                      <Label htmlFor="skills">Skills</Label>
                      <div className="flex mt-2 mb-2">
                        <Input
                          id="skills"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          className="mr-2"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill();
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddSkill}
                          style={{ backgroundColor: "#F6C500", color: "#000000" }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-2 text-gray-500 hover:text-gray-700"
                              onClick={() => handleRemoveSkill(skill)}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        {skills.length === 0 && (
                          <p className="text-gray-500 text-sm italic">Add your skills to help employers find you</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      style={{ backgroundColor: "#F6C500", color: "#000000" }}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            ) : (
              // View Profile
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="w-32 h-32 border-4 border-[#F6C500]">
                      <AvatarImage src={user.profilePicture || undefined} />
                      <AvatarFallback className="text-3xl">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{name}</CardTitle>
                      <CardDescription className="text-lg">{title || 'No title set'}</CardDescription>
                      <div className="mt-2 text-sm text-gray-500">{user.role === 'student' ? 'Student/Job Seeker' : user.role}</div>
                      {user.role === 'student' && (
                        <div className="mt-2">
                          <span className="inline-block bg-[#FFFBEA] text-[#F6C500] border border-[#F6C500] text-xs font-semibold px-2.5 py-0.5 rounded">
                            Open to work
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700">
                      {bio || 'No bio added yet.'}
                    </p>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div>{email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div>{phone || 'Not provided'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div>{location || 'Not provided'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Website</div>
                        <div>
                          {website ? (
                            <a
                              href={website.startsWith('http') ? website : `https://${website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {website}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No skills added yet</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Type */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Type</h3>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-[#FFFBEA] flex items-center justify-center">
                        <span className="text-xl text-[#F6C500]">
                          {user.role === 'student' ? '👨‍🎓' : user.role === 'employer' ? '🏢' : '🔒'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {user.role === 'student' ? 'Student/Job Seeker' : 
                          user.role === 'employer' ? 'Employer' : 'Administrator'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.role === 'student' ? 'You can apply to jobs and build your resume' : 
                          user.role === 'employer' ? 'You can post jobs and view applicants' : 
                          'You have administrative privileges'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Password Change */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Password</h3>
                  <Button 
                    variant="outline"
                    onClick={() => alert('Password change functionality would appear here')}
                  >
                    Change Password
                  </Button>
                </div>
                
                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                  <div className="text-gray-500">
                    Notification settings would appear here in a real application.
                  </div>
                </div>
                
                {/* Delete Account */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('This is a demo. In a real application, this would delete your account. Continue?')) {
                        alert('Account deletion process would start here');
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;