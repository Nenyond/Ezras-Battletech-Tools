function Bones () {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;

    return (
        d1 + d2
    )
}

function ASRoll() {

    let da = Math.floor(Math.random() * 6) + 1;
    
    return (
        da
    )
}

function ASToHit(value)  {

      let target = value
      const Swing = Bones()
      const Crit = `${Swing}, CRITICAL HIT!`
      const Hit = `${Swing}, Hit`
      const Miss = `${Swing}, Miss`
  
      if (Swing == 12)
        return document.getElementById("hit").innerHTML = Crit;
      else if (Swing >= target)
        return document.getElementById('hit').innerHTML = Hit;
      else
        return document.getElementById('hit').innerHTML = Miss;
}

function CBTToHit(value)  {

    let target = value
    const Swing = Bones()
    const Hit = ` To Hit Roll: ${Swing}, Hit.`
    const Miss = `To Hit Roll: ${Swing}, Miss.`

    if (Swing >= target)
      return document.getElementById('hit').innerHTML = Hit;
    else
      return document.getElementById('hit').innerHTML = Miss;
}

function ASDamage(value) {
    
    let numberOfRolls = value;
    const threshold = 3; 
    let count = 1; 
    
        for (let i = 0; i < numberOfRolls - 1; i++) {
            const damage = ASRoll(); 
            if (damage >= threshold) {
                count++; 
            }
        }
    
    return document.getElementById("damage").innerHTML = `Total Damage: ${count}`
};

function ASPartial() {

    let partial = ASRoll();
    const confirm = `${partial}, 1 Damage.`
    const noConfirm = `${partial}, No Damage.`
    if (partial >= 5)
        return document.getElementById("partial").innerHTML = confirm
    else
    return document.getElementById("partial").innerHTML = noConfirm
}

function ASCrits(type) {
    const arrays = {
        mekcrit: [
            'Ammo Hit', 'Engine Hit', 'Fire Control Hit', 'No Critical Hit', 
            'Weapon Hit', 'MP Hit', 'Weapon Hit', 'No Critical Hit', 
            'Fire Control Hit', 'Engine Hit', 'Mech Destroyed'
        ],
        Protcrit: [
            'Weapon Hit', 'Weapon Hit', 'Fire Control Hit', 'MP Hit', 
            'No Critical Hit', 'MP Hit', 'No Critical Hit', 'MP Hit', 
            'Protomech Destroyed', 'Weapon Hit', 'Weapon Hit'
        ],
        Veecrit: [
            'Ammo Hit', 'Crew Stunned', 'Fire Control Hit', 'Fire Control Hit', 
            'No Critical Hit', 'No Critical Hit', 'No Critical Hit', 'Weapon Hit', 
            'Weapon Hit', 'Crew Killed', 'Engine Hit'
        ]
    };

    const getcrit = (array) => {
        const roll = Bones();
        const index = roll - 2;
        return array[index];
    };

    if (!arrays[type]) {
        console.error("Invalid type provided. Choose 'mekcrit', 'Protcrit', or 'Veecrit'.");
        return;
    }

    const selectedCrit = getcrit(arrays[type]);
    document.getElementById("ascrit").innerHTML = selectedCrit;
}

function d6(value) {
    let numberOfRolls = value;
    let total = 0;
    
    for (let i = 0; i < numberOfRolls; i++) {
        const roll = ASRoll();
        total += roll
    }
    return document.getElementById("dice").innerHTML = `Roll ${numberOfRolls}D6: ${total}`
}

function HitLocs(type, numberOfRolls, updateDOM = false) {
    const arrays = {
        mekfront: [
            'Center Torso - Critical', 
            'Right Arm', 
            'Right Arm', 
            'Right Leg', 
            'Right Torso', 
            'Center Torso', 
            'Left Torso', 
            'Left Leg', 
            'Left Arm', 
            'Left Arm', 
            'Head'
        ],
        mekleft: [
            'Left Torso - Critical', 
            'Left Leg', 
            'Left Arm', 
            'Left Arm', 
            'Left Leg', 
            'Left Torso', 
            'Center Torso', 
            'Right Torso', 
            'Right Arm', 
            'Right Leg', 
            'Head'
        ],
        mekright: [
            'Right Torso - Critical', 
            'Right Leg', 
            'Right Arm', 
            'Right Arm', 
            'Right Leg', 
            'Right Torso', 
            'Center Torso', 
            'Left Torso', 
            'Left Arm', 
            'Left Leg', 
            'Head'
        ]
    };
    const hitlocations = [];

    const gethit = (array) => {
        const roll = Bones();
        const index = roll - 2;
        return array[index];
    };

    const chainHits = (numberOfRolls) => {
      for (let i = 0; i < numberOfRolls; i++) {
        const location = gethit(arrays[type]);
        hitlocations.push(location);
      }
    }

    chainHits(numberOfRolls);
    
    const selectedHit = gethit(arrays[type]);

    if (updateDOM) {
     return document.getElementById("location").innerHTML = `Hit Location(s): ${hitlocations.join(', ')}`
    }
    return `${hitlocations.join(', ')}`;
}

function VeeHitLocs (type, updateDOM = false) {
    const arrays = {
        front: [
            'Front - Critical',
            'Front (Motive)',
            'Front (Motive)',
            'Right Side (Motive)',
            'Front',
            'Front',
            'Front',
            'Left Side (Motive)',
            'Turret',
            'Turret',
            'Turret - Critical'
        ],
        rear: [
            'Rear - Critical',
            'Rear (Motive)',
            'Rear (Motive)',
            'Rear (Motive)',
            'Left Side (Motive)',
            'Rear',
            'Rear',
            'Rear',
            'Right Side (Motive)',
            'Turret',
            'Turret',
            'Turret - Critical'
        ],
        Side: [
            'Side - Critical',
            'Side (Motive)',
            'Side (Motive)',
            'Side (Motive)',
            'Front (Motive)',
            'Side',
            'Side',
            'Side - Critical',
            'Rear (Motive)',
            'Turret',
            'Turret',
            'Turret - Critical'
        ]
    };
    

    const gethit = (array) => {
        const roll = Bones();
        const index = roll - 2; 
        return array[index];
    };

    const selectedHit = gethit(arrays[type]);

    if (updateDOM) {
        return document.getElementById("location").innerHTML = `Hit Location: ${selectedHit}`
    }
    return selectedHit;
}

function PunchLocs(type, updateDOM = false) {
    const arrays = {
        left: [
            'Left Torso',
            'Left Torso',
            'Center Torso',
            'Left Arm',
            'Left Arm',
            'Head'
        ],
        front: [
            'Left Arm',
            'Left Torso',
            'Center Torso',
            'Right Torso',
            'Right Arm',
            'Head'
        ],
        right: [
            'Right Torso',
            'Right Torso',
            'Center Torso',
            'Right Arm',
            'Right Arm',
            'Head'
        ]
    };
    const gethit = (array) => {
        const roll = ASRoll();
        const index = roll - 1; 
        return array[index];
    };

    const selectedHit = gethit(arrays[type]);

    if (updateDOM) {
        return document.getElementById("location").innerHTML = `Hit Location: ${selectedHit}`
    }
    return selectedHit;
}

function Kick(type, updateDOM = false) {
    const arrays = {
        left: [
            'Left Leg',
            'Left Leg',
            'Left Leg',
            'Left Leg',
            'Left Leg',
            'Left Leg',
        ],
        front: [
            'Right Leg',
            'Right Leg',
            'Right Leg',
            'Left Leg',
            'Left Leg',
            'Left Leg',    
        ],
        right: [
            'Right Leg',
            'Right Leg',
            'Right Leg',
            'Right Leg',
            'Right Leg',
            'Right Leg',
        ]
    };
    const gethit = (array) => {
        const roll = ASRoll();
        const index = roll - 1; 
        return array[index];
    };

    const selectedHit = gethit(arrays[type]);

    if (updateDOM) {
        return document.getElementById("location").innerHTML = `Hit Location: ${selectedHit}`
    }
    return selectedHit;
}

let clusterType = "C2";

const customValues = [2, 3, 4, 5, 6, 9, 10, 12, 15, 20, 30, 40];
        
const clusterMapping = {
2: 'C2', 3: 'C3', 4: 'C4', 5: 'C5', 6: 'C6', 9: 'C9', 10: 'C10', 12: 'C12', 15: 'C15', 20: 'C20', 30: 'C30', 40: 'C40'
};

function updateClusterType(index) {
    console.log("updateClusterType called with index", index);
    const value = customValues[index];
    clusterType = clusterMapping[value];

    if (clusterType) {
    document.getElementById("clusterValue").innerText = clusterType;
    }
}

function Cluster(type) {

    const arrays = {
        C2: [1,1,1,1,1,1,2,2,2,2,2],
        C3: [1,1,1,2,2,2,2,2,3,3,3],
        C4: [1,2,2,2,2,3,3,3,3,4,4],
        C5: [1,2,2,3,3,3,3,4,4,5,5],
        C6: [2,2,3,3,4,4,4,5,5,6,6],
        C9: [3,3,4,5,5,5,5,7,7,9,9],
        C10: [3,3,4,6,6,6,6,8,8,10,10],
        C12: [4,4,5,8,8,8,8,10,10,12,12],
        C15: [5,5,6,9,9,9,9,12,12,15,15],
        C20: [6,6,9,12,12,12,12,16,16,20,20],
        C30: [10,10,12,18,18,18,18,24,24,30,30],
        C40: [12,12,18,24,24,24,24,32,32,40,40],
    };
    

    const getCluster = (array) => {
        const roll = Bones();
        const index = roll - 2;
        return array[index];
    };

    const selectedCluster = getCluster(arrays[type]);
    return document.getElementById("clusters").innerHTML = `${selectedCluster}`;
}

function Narc(type) {

    const arrays = {
        C2: [1,1,1,1,1,1,2,2,2,2,2],
        C3: [1,1,1,2,2,2,2,2,3,3,3],
        C4: [1,2,2,2,2,3,3,3,3,4,4],
        C5: [1,2,2,3,3,3,3,4,4,5,5],
        C6: [2,2,3,3,4,4,4,5,5,6,6],
        C9: [3,3,4,5,5,5,5,7,7,9,9],
        C10: [3,3,4,6,6,6,6,8,8,10,10],
        C12: [4,4,5,8,8,8,8,10,10,12,12],
        C15: [5,5,6,9,9,9,9,12,12,15,15],
        C20: [6,6,9,12,12,12,12,16,16,20,20],
        //C30: [10,10,12,18,18,18,18,24,24,30,30],
        //C40: [12,12,18,24,24,24,24,32,32,40,40],
    };
    

    const getCluster = (array) => {
        const roll = Bones() +2;
        const index = Math.max(0, Math.min(roll - 2, array.length - 1));
        return array[index];
    };

    const selectedCluster = getCluster(arrays[type]);
    return document.getElementById("clusters").innerHTML = `${selectedCluster}`;
}

function HAGL(type) {

    const arrays = {
        //C2: [1,1,1,1,1,1,2,2,2,2,2],
        //C3: [1,1,1,2,2,2,2,2,3,3,3],
        //C4: [1,2,2,2,2,3,3,3,3,4,4],
        //C5: [1,2,2,3,3,3,3,4,4,5,5],
        //C6: [2,2,3,3,4,4,4,5,5,6,6],
        //C9: [3,3,4,5,5,5,5,7,7,9,9],
        //C10: [3,3,4,6,6,6,6,8,8,10,10],
        //C12: [4,4,5,8,8,8,8,10,10,12,12],
        //C15: [5,5,6,9,9,9,9,12,12,15,15],
        C20: [6,6,9,12,12,12,12,16,16,20,20],
        C30: [10,10,12,18,18,18,18,24,24,30,30],
        C40: [12,12,18,24,24,24,24,32,32,40,40],
    };
    

    const getCluster = (array) => {
        const roll = Bones() +2;
        const index = Math.max(0, Math.min(roll - 2, array.length - 1));
        return array[index];
    };

    const selectedCluster = getCluster(arrays[type]);
    return document.getElementById("clusters").innerHTML = `${selectedCluster}`;
}

function HAGS(type) {

    const arrays = {
        //C2: [1,1,1,1,1,1,2,2,2,2,2],
        //C3: [1,1,1,2,2,2,2,2,3,3,3],
        //C4: [1,2,2,2,2,3,3,3,3,4,4],
        //C5: [1,2,2,3,3,3,3,4,4,5,5],
        //C6: [2,2,3,3,4,4,4,5,5,6,6],
        //C9: [3,3,4,5,5,5,5,7,7,9,9],
        //C10: [3,3,4,6,6,6,6,8,8,10,10],
        //C12: [4,4,5,8,8,8,8,10,10,12,12],
        //C15: [5,5,6,9,9,9,9,12,12,15,15],
        C20: [6,6,9,12,12,12,12,16,16,20,20],
        C30: [10,10,12,18,18,18,18,24,24,30,30],
        C40: [12,12,18,24,24,24,24,32,32,40,40],
    };
    

    const getCluster = (array) => {
        const roll = Bones() -2;
        const index = Math.max(0, Math.min(roll - 2, array.length - 1));
        return array[index];
    };

    const selectedCluster = getCluster(arrays[type]);
    return document.getElementById("clusters").innerHTML = `${selectedCluster}`;
}

function groupings (value) {
    const cluster = parseFloat(document.getElementById("clusters").innerHTML);
    const groups = Math.floor(cluster / value);
    const remainder = cluster % value

    return document.getElementById("hitGroups").innerHTML = `${groups} groups of ${value} with ${remainder} leftover.`
}

function CBTInternal1(type) {

    const arrays = {
        Head: [
            '1: Life Support',
            '2: Sensors',
            '3: Cockpit',
            '4: open slot',
            '5: Sensors',
            '6: Life Support'
        ],
        Leg: [
            '1: Hip',
            '2: Upper Leg Actuator',
            '3: Lower Leg Actuator',
            '4: Foot Actuator',
            '5: open slot',
            '6: open slot'
        ],
    };

    const getCrit = (array) => {
        const roll = ASRoll();
        const index = roll - 1;
        return array[index];
    };
    const selectedCrit = getCrit(arrays[type]);
    return document.getElementById("internal").innerHTML = `Critical Hit: ${selectedCrit}`;
}

function CBTInternal2(type) {

    const arrays = {
        Arm: [
            'Upper 1: Shoulder',
            'Upper 2: Upper Arm Actuator',
            'Upper 3: Lower Arm Actuator',
            'Upper 4: Hand Actuator',
            'Upper 5: open slot',
            'Upper 6: open slot',
            'Lower 1: open slot',
            'Lower 2: open slot',
            'Lower 3: open slot',
            'Lower 4: open slot',
            'Lower 5: open slot',
            'Lower 6: open slot',
        ],
        Side: [
            'Upper 1: open slot',
            'Upper 2: open slot',
            'Upper 3: open slot',
            'Upper 4: open slot',
            'Upper 5: open slot',
            'Upper 6: open slot',
            'Lower 1: open slot',
            'Lower 2: open slot',
            'Lower 3: open slot',
            'Lower 4: open slot',
            'Lower 5: open slot',
            'Lower 6: open slot',
        ],
        Center: [
            'Upper 1: Engine',
            'Upper 2: Engine',
            'Upper 3: Engine',
            'Upper 4: Gyro',
            'Upper 5: Gyro',
            'Upper 6: Gyro',
            'Lower 1: Gyro',
            'Lower 2: Engine',
            'Lower 3: Engine',
            'Lower 4: Engine',
            'Lower 5: open slot',
            'Lower 6: open slot'
        ]
    };

    const getCrit = (array) => {
        const roll = Math.floor(Math.random() * 12);
        const index = roll;
        return array[index];
    };
    const selectedCrit = getCrit(arrays[type]);
    return document.getElementById("internal").innerHTML = `Critical Hit: ${selectedCrit}`; 
}

function GATOR(value) {
    gator += value;

    return document.getElementById("gator").innerHTML = `Target Number: ${gator}`
}

function reset() {//deprecated 13Nov24
    gator = 0;
}

function CBTcrit() {
    const roll = Bones();
    const c12 = `${roll}: Head/Limb blown off; Roll 3 Critical Hit Locations (Torso)`
    const cbad = `${roll}: Roll 2 Critical Hit Locations`
    const cnotbad = `${roll}: Roll 1 Critical Hit Location`
    const cgood = `${roll}: No Critical`

    if (roll == 12) {
        return document.getElementById("crit").innerHTML = c12;
    }
    else if (roll >= 10 && roll <= 11) {
        return document.getElementById("crit").innerHTML = cbad;
    }
    else if (roll >= 8 && roll <= 9) {
        return document.getElementById("crit").innerHTML = cnotbad;
    }
    else {
    return document.getElementById("crit").innerHTML = cgood;
    }
}

function AScatter() {
    var img = document.getElementById("spin");
    var roll = ASRoll()
    const dist = ASRoll() *2

    if (roll == 1) {
        img.style.transform = 'rotate(-90deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else if (roll == 2) {
        img.style.transform = 'rotate(-30deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else if (roll == 3) {
        img.style.transform = 'rotate(30deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else if (roll == 4) {
        img.style.transform = 'rotate(90deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else if (roll == 5) {
        img.style.transform = 'rotate(150deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else {
    img.style.transform = 'rotate(210deg)';
    document.getElementById("dist").innerHTML = `${dist}"`;
}
}

function dirscat() { //directional scatter from altitude bombing
    var img = document.getElementById("spin");
    var roll = Math.floor(Math.random() * 3)
    const dist = ASRoll() *2

    if (roll == 1) {
        img.style.transform = 'rotate(-90deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else if (roll == 2) {
        img.style.transform = 'rotate(-30deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
    else {
        img.style.transform = 'rotate(210deg)';
        document.getElementById("dist").innerHTML = `${dist}"`;
    }
}

function CBTDFA(type) {
    const WeightSlider = document.getElementById("weightRange").value;
    const damage = Math.ceil((WeightSlider / 10) * 3);
    const groups = Math.floor(damage / 5)
    const remainder = damage % 5
    const float = PunchLocs(type)
    const retribution = WeightSlider / 5
    const retremain = retribution % 5
    const retGroups = Math.floor(retribution / 5)
    const retfloat = Kick('front')

    const highlander = (numberOfGroups) => {
        let hitlocations = [];

        for (let i = 0; i < numberOfGroups; i++) {
            const location = PunchLocs(type);
            hitlocations.push(location);
        }
        return hitlocations;
    };

    const legDamage = (number) => {
        let legs = [];

        for (let i = 0; i < number; i++) {
            const leghits = Kick('front');
            legs.push(leghits);
        };
        return legs
    };
    
    const hitlocations = highlander(groups);

    const locations = hitlocations.join(', ');

    const leglocations = legDamage(retGroups);

    const legsmash = leglocations.join(', ')

    document.getElementById("vector").innerHTML = 
        `DFA Damage: The attack deals ${damage} damage, in 5 point groups, to: ${locations}, and ${remainder} damage to:  ${float}. <br> The attacking Mech suffers ${retribution} damage, in 5 point groups, to: ${legsmash}, and ${retremain} to: ${retfloat}.`;
}

function DFAVee () {
    const WeightSlider = document.getElementById("weightRange").value;
    const damage = Math.ceil((WeightSlider / 10) * 3);
    const groups = Math.floor(damage / 5)
    const remainder = damage % 5
    const float = VeeHitLocs('front')
    const retribution = WeightSlider / 5
    const retremain = retribution % 5
    const retGroups = Math.floor(retribution / 5)
    const retfloat = Kick('front')

    const highlander = (numberOfGroups) => {
        let hitlocations = [];

        for (let i = 0; i < numberOfGroups; i++) {
            const location = VeeHitLocs('front');
            hitlocations.push(location);
        }
        return hitlocations;
    };

    const legDamage = (number) => {
        let legs = [];

        for (let i = 0; i < number; i++) {
            const leghits = Kick('front');
            legs.push(leghits);
        };
        return legs
    };
    
    const hitlocations = highlander(groups);

    const locations = hitlocations.join(', ');

    const leglocations = legDamage(retGroups);

    const legsmash = leglocations.join(', ')

    document.getElementById("vector").innerHTML = 
        `DFA Damage: The attack deals ${damage} damage, in 5 point groups, to: ${locations}, and ${remainder} damage to:  ${float}. <br> The attacking Mech suffers ${retribution} damage, in 5 point groups, to: ${legsmash}, and ${retremain} to: ${retfloat}.`;
}

function PSR(value) {
    psr += value;
    return document.getElementById("psr").innerHTML = `PSR Target: ${psr}`
}

function PSRcheck () {
    let roll = Bones();
    const tn = psr;
    
    if (roll >= tn)
        return document.getElementById("psrRoll").innerHTML = `PSR Roll: ${roll}, success.`;
    else
    return document.getElementById("psrRoll").innerHTML =  `PSR Roll; ${roll}, fail.`
}

function psrReset() {
    psr = 0;
    document.getElementById("psr").innerHTML = `PSR Target: Roll`
    document.getElementById("psrRoll").innerHTML = `PSR Roll:`
}

function meleeHit() {
    tn = gator;
    roll = Bones();
    const hit = `Melee Attack Roll: ${roll}, hit.`;
    const miss = `Melee Attack roll ${roll}, miss.`

    if (roll >= tn) 
       return document.getElementById("hit").innerHTML = hit;
    else
    return document.getElementById("hit").innerHTML = miss;
}

function mReset () {
    gator = 0;
    document.getElementById("gator").innerHTML = "ToHit:"
    document.getElementById("hit").innerHTML = "Melee Attack Roll:"
}

function punch (value, type) {
    let mass = WeightSlider.value;
    const roll = ASRoll();
    const damage = Math.ceil(mass / 10); 
    let calcDam = Math.max(1, Math.floor(damage / value)) 
    let selectedHit = PunchLocs(type)
   
    return document.getElementById("punchResult").innerHTML = `Target suffers ${calcDam} to the ${selectedHit}`
}

function melKick (value, type) {
    let mass = WeightSlider.value;
    const roll = ASRoll();
    const damage = mass / 5; 
    let calcDam = Math.max(1, Math.floor(damage / value)) 
    let selectedHit = Kick(type)
   
    return document.getElementById("kickResult").innerHTML = `Target suffers ${calcDam} to the ${selectedHit}`
}

function clubFind (value) {
    let tn = value;
    const roll = Bones();
    const success = `${roll}, found a girder.`
    const fail = `${roll}, no girder.`
    
    if (roll >= tn)
        return document.getElementById("girder").innerHTML = success;
    else 
    return document.getElementById("girder").innerHTML = fail;
}

function getClubby (type, numberOfRolls) {
    let mass = WeightSlider.value;
    const hit = HitLocs(type, numberOfRolls, false);
    let calc = mass / 5;

    document.getElementById("clubHit").innerHTML = `Target takes ${calc} points of damage to the ${hit}.`
}

function fallFacing () { 
    const roll = ASRoll();
    const facing = [
        'Same Direction',
        '1 Hexside Right',
        '2 Hexsides Right',
        'Opposite Diretion',
        '2 Hexsides Left',
        '1 Hexside Left',
    ];
    const hitDirection = [
        'mekfront',
        'mekright',
        'mekright',
        'mekfront', //Technically, its Rear, but it *should* pass as a type on the hitLocs function to determine hit locations.
        'mekleft',
        'mekleft',
    ]

    return {
        fallDirection: facing [roll - 1],
        fallImpact: hitDirection [roll - 1]
    }
}

function fallDamage() {
    const mass = parseFloat(WeightSlider.value);
    const height = parseFloat(fallSlider.value);
    const distance = height + 1;
    const damage = Math.ceil(mass / 10) * (distance);
    
    return damage
}

function fallMek() {
    const damage = fallDamage()
    const fallResults = fallFacing()
    const facing = fallResults.fallDirection
    let type = fallResults.fallImpact
    let numberOfRolls = damage / 5
    const hitLocation = HitLocs(type, numberOfRolls, false);

    

    document.getElementById("fallResult").innerHTML = `Fall damage: ${damage} damage in groups of 5 to: ${hitLocation}. <br>Facing After the Fall: ${facing}.`
}