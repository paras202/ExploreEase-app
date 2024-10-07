import TouristPlaceDetails from "@/app/ui/TouristPlaceDetails";

// The `params` object contains dynamic route parameters
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Extract the id from the params object

  return (
    <div>
      {/* Pass the id as a prop to the TouristPlaceDetails component */}
      <TouristPlaceDetails id={id} />
    </div>
  );
}
