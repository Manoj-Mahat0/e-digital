import React, { useEffect, useState } from "react";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Added FaPhoneAlt
import { HiX } from "react-icons/hi";
import api from "../../services/api"; // axios instance

// Skeleton Loader Component for better perceived performance
const TeamCardSkeleton = () => (
  <div className="bg-gray-100 rounded-2xl p-6 shadow-sm animate-pulse h-56">
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 rounded-xl bg-gray-300"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-gray-300 rounded"></div>
      <div className="h-3 bg-gray-300 rounded w-11/12"></div>
      <div className="h-3 bg-gray-300 rounded w-10/12"></div>
    </div>
    <div className="flex justify-between mt-6">
      <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
      <div className="h-8 w-20 bg-sky-600/50 rounded-full"></div>
    </div>
  </div>
);

export default function TeamShowcase() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchTeam() {
      setLoading(true);
      setError(null);
      try {
        // You might want to remove `?only_active=false` if you only want active members for the public showcase
        const res = await api.get("/team/?only_active=false"); 
        if (!mounted) return;
        const items = res.data?.items || [];
        const mapped = items.map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          bio: m.bio || "A dedicated professional and a valuable member of our team at E-Digital India.", // Added fallback bio
          email: m.email,
          phone: m.phone,
          linkedin: m.linkedin,
          twitter: m.twitter,
          avatar: m.photo
            ? `https://be.edigital.globalinfosofts.com${m.photo}`
            : "https://via.placeholder.com/150?text=Profile", // Added placeholder avatar
          isActive: m.is_active,
        }));
        setTeam(mapped);
      } catch (err) {
        console.error("Failed to fetch team:", err);
        setError("Oops! We couldn't load our team members. Please check back soon.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTeam();
    return () => (mounted = false);
  }, []);
  
  // Close modal on escape key press
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        setActiveMember(null);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const numSkeletons = 6; // Display 6 skeleton cards while loading

  return (
    <>
      <section className="py-20 bg-gray-50"> {/* Changed bg-white to bg-gray-50 for a softer look */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Meet Our Passionate Team 
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Behind every successful project are the people who make it happen. Get to know the dedicated professionals driving E-Digital India forward.
            </p>
          </div>

          {/* Loading & Error */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(numSkeletons)].map((_, i) => (
                <TeamCardSkeleton key={i} />
              ))}
            </div>
          )}
          {error && (
            <div className="text-center py-20 text-xl font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl mx-auto max-w-md p-6">
              {error}
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Increased gap for visual space */}
              {team.length === 0 ? (
                <div className="col-span-full text-center py-20 text-xl text-gray-500">
                  No team members are currently listed.
                </div>
              ) : (
                team.map((member, idx) => (
                  <article
                    key={member.id || idx}
                    onClick={() => setActiveMember(member)} // Make whole card clickable
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer 
                                hover:shadow-2xl hover:border-sky-500 transition duration-300 ease-in-out transform hover:-translate-y-1" // Enhanced hover effect
                  >
                    <div className="flex items-start gap-5"> {/* Adjusted to items-start for better alignment */}
                      <img
                        src={member.avatar}
                        alt={`${member.name} avatar`}
                        className="h-24 w-24 flex-shrink-0 rounded-full object-cover border-4 border-white shadow-md" // Rounded avatar with subtle shadow
                      />
                      <div className="flex-1 pt-1">
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-md font-medium text-sky-600 mt-0.5">{member.role}</p> {/* Highlight role */}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mt-5 line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex items-center justify-between mt-6 border-t pt-4"> {/* Separator line */}
                      <div className="flex items-center gap-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} LinkedIn`}
                            onClick={(e) => e.stopPropagation()} // Prevent modal opening when clicking link
                            className="p-2 rounded-full text-sky-700 hover:text-sky-800 hover:bg-sky-50 transition"
                          >
                            <FaLinkedin className="h-6 w-6" />
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} Twitter`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full text-sky-400 hover:text-sky-500 hover:bg-sky-50 transition"
                          >
                            <FaTwitter className="h-6 w-6" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                          >
                            <FaEnvelope className="h-6 w-6" />
                          </a>
                        )}
                      </div>

                      <span className="text-sky-600 font-semibold text-sm hover:underline">
                        View Profile &rarr;
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modal - Improved UX and Accessibility */}
      {activeMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
          onClick={() => setActiveMember(null)} // Close on backdrop click
        >
          <div 
            className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl transform scale-100 opacity-100 transition duration-300 overflow-hidden" 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="relative p-8">
              <button
                onClick={() => setActiveMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition z-10"
                aria-label="Close profile"
              >
                <HiX className="h-7 w-7" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b pb-6 mb-6">
                <img
                  src={activeMember.avatar}
                  alt={`${activeMember.name} avatar`}
                  className="h-32 w-32 rounded-full object-cover border-4 border-sky-100 shadow-xl flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 id="team-modal-title" className="text-3xl font-extrabold text-gray-900">
                    {activeMember.name}
                  </h3>
                  <p className="text-xl font-semibold text-sky-700 mt-1">{activeMember.role}</p>
                </div>
              </div>

              {/* Contact and Bio */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">About {activeMember.name}</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {activeMember.bio || "No detailed biography available yet."}
                  </p>
                </div>

                <div className="lg:col-span-1 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h4>
                  
                  {activeMember.email && (
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <FaEnvelope className="h-5 w-5 text-sky-600 flex-shrink-0" />
                      <a
                        href={`mailto:${activeMember.email}`}
                        className="text-sky-600 hover:text-sky-700 transition break-all"
                      >
                        {activeMember.email}
                      </a>
                    </div>
                  )}

                  {activeMember.phone && (
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <FaPhoneAlt className="h-5 w-5 text-sky-600 flex-shrink-0" />
                      <p>
                        {activeMember.phone}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-6">
                    {activeMember.linkedin && (
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition shadow-md"
                        aria-label={`${activeMember.name} LinkedIn Profile`}
                      >
                        <FaLinkedin className="h-5 w-5" />
                      </a>
                    )}
                    {activeMember.twitter && (
                      <a
                        href={activeMember.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition shadow-md"
                        aria-label={`${activeMember.name} Twitter Profile`}
                      >
                        <FaTwitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setActiveMember(null)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}