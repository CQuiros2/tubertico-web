const MAP_EMBED = 'https://maps.google.com/maps?q=Tuberculos+Ticos+S.R.L.+(TUBERTICO)&z=17&output=embed';

export function LocationMap() {
  return (
    <section className="w-full">
      <div className="w-full h-[400px] md:h-[460px]">
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="100%"
          className="w-full h-full block"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tubertico — ubicación"
          allowFullScreen
        />
      </div>
    </section>
  );
}
