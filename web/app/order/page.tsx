import { getActiveLocations } from '@/lib/sanity.client';
import { Location } from '@/lib/types';

export const revalidate = 60;

export default async function Page() {
  const locations = await getActiveLocations();
  return (
    <div className="grid" style={{gap:16}}>
      <h1 style={{marginTop:0}}>Order Online</h1>
      <div className="grid cols-2">
        {locations.map((loc: Location) => (
          <div className="card" key={loc.slug}>
            <h3 style={{marginTop:0}}>{loc.name}</h3>
            <p>{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
            <div style={{display:'flex',gap:12}}>
              <a className="btn" href={loc.orderUrl} target="_blank" rel="noreferrer">Order via Toast</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
