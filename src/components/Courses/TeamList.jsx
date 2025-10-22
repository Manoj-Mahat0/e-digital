import React, { useEffect, useState } from "react";
import CreativeProfileCard from "./TeamShowcase";

/**
 * TeamList
 * Fetches: GET https://be.edigital.globalinfosofts.com/team/?only_active=false
 * Renders a grid of CreativeProfileCard components.
 */

export default function TeamList() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchTeam() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://be.edigital.globalinfosofts.com/team/?only_active=false",
          {
            headers: { accept: "application/json" },
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch team: ${res.status} ${text}`);
        }

        const data = await res.json();
        // Safety: ensure items array exists
        setTeam(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Team fetch error:", err);
          setError(err.message || "Failed to load team");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-gray-500">Loading team...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded bg-sky-600 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
        No team members found.
      </div>
    );
  }

  // Helper: build absolute avatar url if needed
  const avatarBase = "https://be.edigital.globalinfosofts.com";

  return (
    <div className="py-8 px-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m) => {
          const avatar = m.photo ? `${avatarBase}${m.photo}` : "/placeholder-avatar.png";
          // create a clean handle from role or name
          const handle = m.role
            ? `@${m.role.replace(/\s+/g, "_").toLowerCase()}`
            : `@${m.name.replace(/\s+/g, "_").toLowerCase()}`;

          // sanitize bio/role to avoid too-long text in card role slot
          const bio = m.bio ? m.bio : m.role || "";

          return (
            <CreativeProfileCard
              key={m.id}
              name={m.name}
              handle={handle}
              role={bio}
              avatar={avatar}
            />
          );
        })}
      </div>
    </div>
  );
}
