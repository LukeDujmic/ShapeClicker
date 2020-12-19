// artUnlockCost = (artAmount + 1) * 1.35**(artAmount + 1);
var artUnlocked = [true, false, false, false, false, false];
var artUnlockedT = [true, false, false, false, false, false];
var artifact1 = undefined;
var artifact2 = undefined;
var artifact3 = undefined;
var artifact4 = undefined;
var artifact5 = undefined;
//setting up artifact variables
var totalArtDmg = 0;
var artDamages = [0, 0, 0, 0, 0, 0];
//individual artifact multipliers
var coreStrengthMult = 1;
var radiantCubeMult = 1;
var honedTriMult = 1;
var inspDiamMult = 1;
var squaMightMult = 1;

function totalArtifactDamage(){
    totalArtDmg = artDamages.reduce(function(a, b){
        return a + b;
    }, 0)
    console.log(totalArtDmg);
}
// buy artifact function uses an object to create a new artifact with specific stats.  
function buyArtifact()  
{
    artUnlockCost = Math.floor((artAmount + 1) * 1.35**(artAmount + 1));    //cost equation for new artifacts
    if (shapestone >= artUnlockCost && (artUnlocked[1] == false || artUnlocked[2] == false || artUnlocked[3] == false || artUnlocked[4] == false || artUnlocked[5] == false))
    {
        let r = Math.ceil(Math.random(1) * 5);  //randomizing which artifact you get
        switch (r)
        {
            case 1:
                if (artUnlocked[1] == true){
                    buyArtifact();
                }
                if (artUnlocked[1] == false)
                {  
                    artAmount += 1;
                    document.getElementById("artifact1").classList.add("shown");
                    document.getElementById("artifact1").classList.remove("hidden");
                    shapestone -= artUnlockCost;
                    console.log("Artifact Purchased");

                    console.log("Core of Strength Unlocked");
                    artUnlocked[1] = true;
                    artifact1 = Object.create(artifact);
                    
                    artifact1.name = 'Core of Strength';
                    artifact1.level = 1;
                    artifact1.artDmg = 0.25;
                    artifact1.artMult = 1.1;
                    artifact1.upCost = 1;
                    artDamages[1] = 0.25;
                    coreStrengthMult = 1.1;
                    totalArtifactDamage();
                    damageSet();

                    document.getElementById("artifact1Upgrade").addEventListener('click', upgradeArt1);
                    break;
                }
            case 2:
                if (artUnlocked[2] == true){
                    buyArtifact();
                }
                if (artUnlocked[2] == false)
                {
                    artAmount += 1;
                    document.getElementById("artifact2").classList.add("shown");
                    document.getElementById("artifact2").classList.remove("hidden");
                    shapestone -= artUnlockCost;
                    console.log("Artifact Purchased");
                    
                    console.log("Radiant Cube Unlocked");
                    artUnlocked[2] = true;
                    
                    artifact2 = Object.create(artifact);
                    
                    artifact2.name = 'Radiant Cube';
                    artifact2.level = 1;
                    artifact2.artDmg = 0.25;
                    artifact2.artMult = 1.1;
                    artifact2.upCost = 1;
                    artDamages[2] = 0.25;
                    radiantCubeMult = 1.1;
                    totalArtifactDamage();
                    damageSet();

                    document.getElementById("artifact2Upgrade").addEventListener('click', upgradeArt2);
                    break;
                }
    
            case 3:
                if (artUnlocked[3] == true){
                    buyArtifact();
                }
                if (artUnlocked[3] == false)
                {
                    artAmount += 1;
                    document.getElementById("artifact3").classList.add("shown");
                    document.getElementById("artifact3").classList.remove("hidden");
                    shapestone -= artUnlockCost;
                    console.log("Artifact Purchased");

                    console.log("Honed Triangle Unlocked");
                    artUnlocked[3] = true;
                    
                    artifact3 = Object.create(artifact);
                    
                    artifact3.name = 'Honed Triangle';
                    artifact3.level = 1;
                    artifact3.artDmg = 0.25;
                    artifact3.artMult = 1.15;
                    artifact3.upCost = 1;
                    artDamages[3] = 0.25;
                    honedTriMult = 1.15;
                    totalArtifactDamage();
                    damageSet();

                    document.getElementById("artifact3Upgrade").addEventListener('click', upgradeArt3);

                    break;
                }
            
            case 4:
                if (artUnlocked[4] == true){
                    buyArtifact();
                }
                if (artUnlocked[4] == false)
                {
                    artAmount += 1;
                    document.getElementById("artifact4").classList.add("shown");
                    document.getElementById("artifact4").classList.remove("hidden");
                    shapestone -= artUnlockCost;
                    console.log("Artifact Purchased");

                    console.log("Inspirational Diamond Unlocked");
                    artUnlocked[4] = true;
                    
                    artifact4 = Object.create(artifact);
                    
                    artifact4.name = 'Inspirational Diamond';
                    artifact4.level = 1;
                    artifact4.artDmg = 0.25;
                    artifact4.artMult = 1.12;
                    artifact4.upCost = 1;
                    artDamages[4] = 0.25;
                    inspDiamMult = 1.12;
                    totalArtifactDamage();
                    damageSet();

                    document.getElementById("artifact4Upgrade").addEventListener('click', upgradeArt4);
                    break;
                }
            

            case 5:
                if (artUnlocked[5] == true){
                    buyArtifact();
                }
                if (artUnlocked[5] == false)
                {
                    artAmount += 1;
                    document.getElementById("artifact5").classList.add("shown");
                    document.getElementById("artifact5").classList.remove("hidden");
                    shapestone -= artUnlockCost;
                    console.log("Artifact Purchased");

                    console.log("Square of Might Unlocked");
                    artUnlocked[5] = true;
                    
                    artifact5 = Object.create(artifact);
                    
                    artifact5.name = 'Square of Might';
                    artifact5.level = 1;
                    artifact5.artDmg = 0.25;
                    artifact5.artMult = 1.2;
                    artifact5.upCost = 1;
                    artDamages[5] = 0.25;
                    squaMightMult = 1.2;
                    totalArtifactDamage();
                    damageSet();

                    document.getElementById("artifact5Upgrade").addEventListener('click', upgradeArt5);
                    break;
                }
                
        }
    }
    
}
function upgradeArt1()
{
    if (artUnlocked[1] == true)
    {
        if (shapestone >= artifact1.upCost){
            shapestone -= artifact1.upCost;
            artifact1.level++;
            artifact1.artDmg += 0.25;
            artDamages[1] = artifact1.artDmg;
            artifact1.upCost = Math.floor(artifact1.level * 1.2 * 1.04**(artifact1.level));
            artifact1.artMult = 1 + (0.1 * artifact1.level * 1.01 ** (artifact1.level - 1));
            coreStrengthMult = artifact1.artMult;
            totalArtifactDamage();
            damageSet();
        }
    }
}
function upgradeArt2()
{
    if (shapestone >= artifact2.upCost){
    shapestone -= artifact2.upCost;
    artifact2.level++;
    artifact2.artDmg += 0.25;
    artDamages[2] = artifact2.artDmg;
    artifact2.upCost = Math.floor(artifact2.level * 1.2 * 1.04**(artifact2.level));
    artifact2.artMult = 1 + (0.1 * artifact2.level * 1.01 ** (artifact2.level - 1));
    radiantCubeMult = artifact2.artMult;
    totalArtifactDamage();
    damageSet();
    }
}
function upgradeArt3()
{
    if (shapestone >= artifact3.upCost){
    shapestone -= artifact3.upCost;
    artifact3.level++;
    artifact3.artDmg += 0.25;
    artDamages[3] = artifact3.artDmg;
    artifact3.upCost = Math.floor(artifact3.level * 1.2 * 1.04**(artifact3.level));
    artifact3.artMult = 1 + (0.15 * artifact3.level * 1.01 ** (artifact3.level - 1));
    honedTriMult = artifact3.artMult;
    totalArtifactDamage();
    damageSet();
    }
}
function upgradeArt4()
{
    if (shapestone >= artifact4.upCost){
    shapestone -= artifact4.upCost;
    artifact4.level++;
    artifact4.artDmg += 0.25;
    artDamages[4] = artifact4.artDmg;
    artifact4.upCost = Math.floor(artifact4.level * 1.2 * 1.04**(artifact4.level));
    artifact4.artMult = 1 + (0.12 * artifact4.level * 1.01 ** (artifact4.level - 1));
    inspDiamMult = artifact4.artMult;
    totalArtifactDamage();
    damageSet();
    }
}
function upgradeArt5()
{
    if (shapestone >= artifact5.upCost){
    shapestone -= artifact5.upCost;
    artifact5.level++;
    artifact5.artDmg += 0.25;
    artDamages[5] = artifact5.artDmg;
    artifact5.upCost = Math.floor(artifact5.level * 1.2 * 1.04**(artifact5.level));
    artifact5.artMult = 1 + (0.2 * artifact5.level * 1.01 ** (artifact5.level - 1));
    squaMightMult = artifact5.artMult;
    totalArtifactDamage();
    damageSet();
    }
}
function resetArtUpgradeButton()
{
    if (artUnlocked[1] == true){
        document.getElementById("artifact1Upgrade").addEventListener('click', upgradeArt1);
    }
    if (artUnlocked[2] == true){
        document.getElementById("artifact2Upgrade").addEventListener('click', upgradeArt2);
    }
    if (artUnlocked[3] == true){
        document.getElementById("artifact3Upgrade").addEventListener('click', upgradeArt3);
    }
    if (artUnlocked[4] == true){
        document.getElementById("artifact4Upgrade").addEventListener('click', upgradeArt4);
    }
}
const artifact = {
    name: '',
    level: 0,
    artDmg: 0,
    artMult: 0,
    upCost: 1,
    upgradeArt: function(){
        if (shapestone >= upCost){
            shapestone -= upCost;
            this.level++;
            this.artDmg += 0.25;
            artDamages[1] = artDmg;
            upCost = Math.floor();
            art1Mult = 1 + (0.1 * this.level * 1.01 ** (this.level - 1));
        }
    }
}