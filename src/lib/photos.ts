// Web-optimised copies (src/assets/web). Originals are preserved untouched in src/assets/photos.
import heroCoolerGroup from "@/assets/web/hero-cooler-group.jpg";
import heroCoolerPair from "@/assets/web/hero-cooler-pair.jpg";
import footballKidsKiosk from "@/assets/web/football-kids-kiosk.jpg";
import footballBoy from "@/assets/web/football-boy.jpg";
import footballPair from "@/assets/web/football-pair.jpg";
import footballAdults from "@/assets/web/football-adults.jpg";
import villaDelivery from "@/assets/web/villa-delivery.jpg";
import beachCouple from "@/assets/web/beach-couple.jpg";
import beachGroup from "@/assets/web/beach-group.jpg";
import eventStrawHat from "@/assets/web/event-straw-hat.jpg";
import eventStrawberry from "@/assets/web/event-strawberry.jpg";
import eventNight from "@/assets/web/event-night.jpg";
import kioskGirl from "@/assets/web/kiosk-girl.jpg";
import streetFriends from "@/assets/web/street-friends.jpg";
import paul from "@/assets/web/paul.jpg";
import team1 from "@/assets/web/team-1.jpg";
import team2 from "@/assets/web/team-2.jpg";
import team3 from "@/assets/web/team-3.jpg";
import team4 from "@/assets/web/team-4.jpg";
import farm from "@/assets/web/farm.jpg";
import mnmServing from "@/assets/web/mnm-05494.jpg";
import mnmBoy from "@/assets/web/mnm-05489.jpg";
import mnmToddlers from "@/assets/web/mnm-05452.jpg";
import mnmGirlMenu from "@/assets/web/mnm-05515.jpg";
import mnmGirl from "@/assets/web/mnm-05482.jpg";
import mnmStall from "@/assets/web/mnm-05475.jpg";

export type Photo = { src: string; alt: string };

export const P = {
  heroCoolerGroup: { src: heroCoolerGroup, alt: "Children crowd around a cooler full of Fruti Pops beside a pool" },
  heroCoolerPair: { src: heroCoolerPair, alt: "Two children open a cooler of Fruti Pops by the pool" },
  footballKidsKiosk: { src: footballKidsKiosk, alt: "Three kids in football kit enjoy pops at the Fruti Pop kiosk" },
  footballBoy: { src: footballBoy, alt: "A smiling boy in football kit holds a Fruti Pop on the pitch" },
  footballPair: { src: footballPair, alt: "Two children with Fruti Pops on a football pitch" },
  footballAdults: { src: footballAdults, alt: "Two men holding Fruti Pops on a football pitch" },
  villaDelivery: { src: villaDelivery, alt: "A Fruti Pop cooler being delivered to a villa door" },
  beachCouple: { src: beachCouple, alt: "A couple enjoying Fruti Pops on a beach lounger" },
  beachGroup: { src: beachGroup, alt: "Friends holding Fruti Pops on a Bali beach" },
  eventStrawHat: { src: eventStrawHat, alt: "A woman in a straw hat enjoying a Fruti Pop at an outdoor event" },
  eventStrawberry: { src: eventStrawberry, alt: "A woman holding a strawberry Fruti Pop at an outdoor event" },
  eventNight: { src: eventNight, alt: "Two women smiling with Fruti Pops in the evening" },
  kioskGirl: { src: kioskGirl, alt: "A little girl with a strawberry Fruti Pop in front of the flavour banner" },
  streetFriends: { src: streetFriends, alt: "Two friends giving a thumbs up with Fruti Pops in Bali" },
  paul: { src: paul, alt: "Paul, founder of Fruti Pop Bali, holding three Fruti Pops" },
  farm: { src: farm, alt: "Paul standing among rows of strawberry plants" },
  team: [
    { src: team1, alt: "Fruti Pop team member holding two pops" },
    { src: team2, alt: "Fruti Pop team member enjoying a pop" },
    { src: team3, alt: "Fruti Pop team member holding two pops" },
    { src: team4, alt: "Fruti Pop team member holding a pop" },
  ],
  mnm: [
    { src: mnmServing, alt: "Fruti Pop staff hand pops to children at the Montessori Night Market" },
    { src: mnmBoy, alt: "A boy biting into a Fruti Pop at the Montessori Night Market" },
    { src: mnmToddlers, alt: "Two young children with Fruti Pops at the Montessori Night Market" },
    { src: mnmGirlMenu, alt: "A girl with a Fruti Pop beside the flavour menu at the Montessori Night Market" },
    { src: mnmGirl, alt: "A girl holding a Fruti Pop at the Montessori Night Market" },
    { src: mnmStall, alt: "The Fruti Pop stall at the Montessori Night Market" },
  ],
} satisfies Record<string, Photo | Photo[]>;
