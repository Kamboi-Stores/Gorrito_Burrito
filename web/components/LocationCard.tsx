import { Location } from '@/lib/types';

type Props = { location: Location };
export default function LocationCard({ location }: Props) {
  const loc = location;
  return (
    <div className="card">
      <h3 style={{marginTop:0, color: 'var(--fg)'}}>{loc.name}</h3>
      <p style={{color: 'var(--fg)'}}>{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
      {loc.phone && (
        <p style={{color: 'var(--muted)', marginBottom: '12px'}}>📞 {loc.phone}</p>
      )}
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <a className="btn" href={loc.orderUrl} target="_blank" rel="noreferrer">Order</a>
        {loc.phone && (
          <a className="btn" href={`tel:${loc.phone}`}>
            Call
          </a>
        )}
        <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state + ' ' + loc.zip)}`} target="_blank" rel="noreferrer">Directions</a>
      </div>
    </div>
  );
}
