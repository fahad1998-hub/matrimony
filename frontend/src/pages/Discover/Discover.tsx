import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProfileCard from "../../components/profile/ProfileCard";
import { profiles } from "../../data/profiles";

export default function Discover() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Any age");
  const [selectedCity, setSelectedCity] = useState("Any city");

  const filtered = useMemo(() => profiles.filter((profile) => {
    const term = search.toLowerCase().trim();
    const textMatch = !term || `${profile.name} ${profile.city} ${profile.profession} ${profile.education}`.toLowerCase().includes(term);
    const ageMatch = selectedAge === "Any age" || (selectedAge === "18–27" && profile.age <= 27) || (selectedAge === "28–35" && profile.age >= 28 && profile.age <= 35);
    const cityMatch = selectedCity === "Any city" || profile.city === selectedCity;
    return textMatch && ageMatch && cityMatch;
  }), [search, selectedAge, selectedCity]);

  return (
    <main className="discover-page">
      <section className="discover-top">
        <div><span className="section-kicker">Discover</span><h1>People worth knowing.</h1><p>Take your time. There's no rush.</p></div>
        <button className="filter-icon" type="button" onClick={() => setShowFilters(true)} aria-label="Open filters"><SlidersHorizontal size={18} /></button>
      </section>

      <div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city or work" /></div>

      <div className="discover-tabs">
        <button className="active" type="button">Recommended</button><button type="button">Newest</button><button type="button">Nearby</button>
      </div>

      <div className="result-count">{filtered.length} profiles for you</div>
      <section className="profile-list">{filtered.map((profile) => <ProfileCard key={profile.id} profile={profile} />)}</section>

      {filtered.length === 0 && <div className="empty-search"><Search size={22} /><h2>No profiles found</h2><p>Try a different name, city or preference.</p></div>}

      {showFilters && (
        <div className="filter-sheet-backdrop" onClick={() => setShowFilters(false)}>
          <section className="filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-heading"><div><span className="section-kicker">Refine</span><h2>Your preferences</h2></div><button type="button" onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={19} /></button></div>
            <div className="filter-group"><label>Age range</label><div className="filter-choice-row">{["Any age", "18–27", "28–35"].map((age) => <button key={age} className={selectedAge === age ? "selected" : ""} onClick={() => setSelectedAge(age)} type="button">{age}</button>)}</div></div>
            <div className="filter-group"><label>City</label><div className="filter-choice-row">{["Any city", "Lucknow", "New Delhi"].map((city) => <button key={city} className={selectedCity === city ? "selected" : ""} onClick={() => setSelectedCity(city)} type="button">{city}</button>)}</div></div>
            <button className="button button-primary button-full" type="button" onClick={() => setShowFilters(false)}>Show {filtered.length} profiles</button>
          </section>
        </div>
      )}
    </main>
  );
}