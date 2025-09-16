export default function MediaImage({
  src,
  alt = '',
  width = 640,
  height = 320,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const imageUrl = src || `https://fakeimg.pl/${width}x${height}/?text=%20`;
  
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-hidden cursor-pointer relative group">
        <img
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out"
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}
