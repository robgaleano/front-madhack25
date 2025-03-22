interface TargetClub {
  clubId: string;
  name: string;
  logo: string;
  _id: string;
}

interface Player {
  _id: string;
  playerId: string;
  name: string;
  position: string;
  age: number;
  nationality: string;
  currentClub: string;
  targetClub: TargetClub;
  contractValue: number;
  tokenPrice: number;
  totalTokens: number;
  soldTokens: number;
  fundingProgress: number;
  fundingDeadline: string;
  status: "active" | "completed" | "failed";
  image: string;
}

export default Player;
