import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import api from "../../services/api";

// Skeleton Loader
const TeamCardSkeleton = () => (
  <div className="bg-gray-100 rounded-2xl p-6 shadow-sm animate-pulse h-56">
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 rounded-xl bg-gray-300"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export default function TeamShowcase() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  // Fetch team members with pagination
  const fetchTeam = useCallback(async (pageNum = 1) => {
    try {
      const limit = 6; // per-page count
      const res = await api.get(`/team/?only_active=false&skip=${(pageNum - 1) * limit}&limit=${limit}`);
      const items = res.data?.items || [];

      const mapped = items.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        bio: m.bio || "A valued member of our E-Digital India team.",
        email: m.email,
        phone: m.phone,
        linkedin: m.linkedin,
        twitter: m.twitter,
        avatar: m.photo
          ? `https://be.edigital.globalinfosofts.com${m.photo}`
          : "https://via.placeholder.com/150?text=Profile",
      }));

      if (pageNum === 1) {
        setTeam(mapped);
      } else {
        setTeam((prev) => [...prev, ...mapped]);
      }

      setHasMore(items.length >= limit);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Couldn't load more team members. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTeam(1);
  }, [fetchTeam]);

  // Infinite scroll observer
  const lastTeamCardRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadingMore(true);
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  // Fetch more when page increments
  useEffect(() => {
    if (page > 1) {
      fetchTeam(page);
    }
  }, [page, fetchTeam]);

  // ESC to close modal
  useEffect(() => {
    const handleKeydown = (e) => e.key === "Escape" && setActiveMember(null);
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              Meet Our Passionate Team
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Behind every successful project are the people who make it happen.
              Meet the dedicated professionals driving E-Digital India forward.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center py-10 text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {(loading ? Array.from({ length: 6 }) : team).map((member, idx) =>
              loading ? (
                <TeamCardSkeleton key={idx} />
              ) : (
                <article
                  ref={idx === team.length - 1 ? lastTeamCardRef : null}
                  key={member.id || idx}
                  onClick={() => setActiveMember(member)}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer 
                             hover:shadow-2xl hover:border-sky-500 transition transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sky-600 font-medium">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mt-5 line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="flex items-center justify-between mt-6 border-t pt-4">
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full text-sky-700 hover:text-sky-800 hover:bg-sky-50 transition"
                        >
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full text-sky-400 hover:text-sky-500 hover:bg-sky-50 transition"
                        >
                          <FaTwitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                        >
                          <FaEnvelope className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <span className="text-sky-600 text-sm font-semibold">
                      View Profile →
                    </span>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Loading More Spinner */}
          {loadingMore && (
            <div className="text-center mt-10 text-gray-500 animate-pulse">
              Loading more team members...
            </div>
          )}
        </div>
      </section>

      {/* Scrollable Modal */}
      {activeMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveMember(null)}
        >
          <div
            className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              aria-label="Close Profile"
            >
              <HiX className="h-6 w-6" />
            </button>

            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 mb-6">
                <img
                  src={activeMember.avatar}
                  alt={activeMember.name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-sky-100 shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-3xl font-extrabold text-gray-900">
                    {activeMember.name}
                  </h3>
                  <p className="text-xl text-sky-700 font-medium mt-1">
                    {activeMember.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    About {activeMember.name}
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {activeMember.bio}
                  </p>
                </div>

                <div className="lg:col-span-1 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Contact Details
                  </h4>
                  {activeMember.email && (
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <FaEnvelope className="text-sky-600" />
                      <a
                        href={`mailto:${activeMember.email}`}
                        className="text-sky-600 hover:underline break-all"
                      >
                        {activeMember.email}
                      </a>
                    </div>
                  )}
                  {activeMember.phone && (
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <FaPhoneAlt className="text-sky-600" />
                      <p>{activeMember.phone}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-4">
                    {activeMember.linkedin && (
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
                      >
                        <FaLinkedin className="h-5 w-5" />
                      </a>
                    )}
                    {activeMember.twitter && (
                      <a
                        href={activeMember.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
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
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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
