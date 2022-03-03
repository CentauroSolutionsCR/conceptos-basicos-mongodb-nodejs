import { Double, ObjectId } from "mongodb";

export default class Player {
    constructor(public ID: Double, public Name: string, public Age: Double,public Photo: string, public Nationality: string,public Flag: string, public Overall:Double,public Potential: Double, public Club: string, public Club_logo: string,public Value: string,public Wage:string, public Special: string, public Position: string,
        public Joined : string, public Height: string, public Weight:string, public Crossing: Double, public Finishing: Double, public HeadingAccuracy: Double,public ShortPassing: Double, public Volleys: Double, public Dribbling: Double,public Curve: Double, public FKAccuracy: Double,public LongPassing:Double,
        public BallControl: Double, public Acceleration: Double, public SprintSpeed:Double, public Agility: Double,public Reactions:Double, public Balance:Double,public ShotPower: Double, public Jumping: Double, public Stamina: Double, public Strenght: Double, public LongShots:Double, public Interceptions:Double,
        public Positioning: Double,public Vision: Double, public Penalties: Double, public Composure: Double, public Marking: Double, public StandingTackle:Double, public SlidingTackle:Double,public GKDiving:Double,public GKHandling: Double,public GKKicking: Double, public GKPositioning: Double, public GKReflexes: Double,
        public Release_clause: string, public Latitude:Double, public Longitude: Double, public description: string,public Body_type:string,public International_reputation: Double, public Jersey_number: Double, public Loaned_from: string, public Preferred_food: string, public Skill_moves: Double, public Work_rate:string,public Weak_foot:Double,public Contract_valid_until:Double 

        ) {}
}
