import { NextResponse } from 'next/server';

type Req = { zip?: string, lat?: number, lng?: number };

export async function POST(req: Request) {
  const body = (await req.json()) as Req;
  let { zip, lat, lng } = body;

  if (!process.env.GOOGLE_GEOCODING_API_KEY) {
    return NextResponse.json({ error: 'Missing GOOGLE_GEOCODING_API_KEY' }, { status: 500 });
  }

  try {
    // Forward geocoding: ZIP to coordinates
    if (zip && (!lat || !lng)) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zip)}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      const data = await res.json();
      if (data.status !== 'OK') {
        return NextResponse.json({ error: 'Invalid ZIP' }, { status: 400 });
      }
      const loc = data.results[0].geometry.location;
      lat = loc.lat; lng = loc.lng;
    }

    // Reverse geocoding: coordinates to ZIP
    if (lat && lng && !zip) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      const data = await res.json();
      if (data.status !== 'OK') {
        return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
      }
      
      // Extract ZIP code from address components
      const addressComponents = data.results[0].address_components;
      const zipComponent = addressComponents.find((component: any) => 
        component.types.includes('postal_code')
      );
      
      if (zipComponent) {
        zip = zipComponent.long_name;
      } else {
        return NextResponse.json({ error: 'ZIP code not found for these coordinates' }, { status: 400 });
      }
    }

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ error: 'No coordinates provided' }, { status: 400 });
    }

    return NextResponse.json({ lat, lng, zip });
  } catch (e: unknown) {
    console.error('Geocode error:', e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Geocode error' }, { status: 500 });
  }
}
