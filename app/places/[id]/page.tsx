import TouristPlaceDetails from "@/app/ui/Destinations/TourishtPlaceDetails";

// The `params` object contains dynamic route parameters
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Extract the id from the params object

  return (
    <div>
      {/* Pass the id as a prop to the TouristPlaceDetails component */}
      <TouristPlaceDetails id={id} />
    </div>
  );
<<<<<<< HEAD
}

=======

}
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45
