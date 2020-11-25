//heroes
function heroUnlockCheck()
{

    if (heroLvl[1] >= 10 && h1M1 == false)
    {
        document.getElementById("hero1M1").innerHTML = "Hero Damage x 1.2";
        document.getElementById("hMCost1").innerHTML = convrt(hM1Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
        
    }
    if (heroLvl[1] >= 30 && h1M2 == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Gold x 1.5";
        document.getElementById("hMCost1").innerHTML = convrt(hM2Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
        
    }
    if (heroLvl[1] >= 60 && h1M3 == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Damage x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM3Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
        
    }
    if (heroLvl[1] >= 100 && h1M4 == false)
    {
        document.getElementById("hero1M1").innerHTML = "Click Damage x 1.2";
        document.getElementById("hMCost1").innerHTML = convrt(hM4Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
        
    }
    if (heroLvl[1] >= 200 && h1M5 == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM5Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }

    //hero 1 unlocks
    if (stage > 0 && hero1Unlocked == false)
    {
        hero1Unlocked = true;
        document.getElementById("hero1Button").addEventListener("click", buyHero1);
        document.getElementById("hCost1").innerHTML = convrt(hCost[1]);
    }
    //hero 2 unlocks
    if (stage > 0 && hero2Unlocked == false)
    {
        hero2Unlocked = true;
        document.getElementById("hero2Button").addEventListener("click", buyHero2);
        document.getElementById("hCost2").innerHTML = convrt(hCost[2]);
    }

    //hero 3 unlocks
    if (stage > 0 && hero3Unlocked == false)
    {
        hero3Unlocked = true;
        document.getElementById("hero3Button").addEventListener("click", buyHero3);
        document.getElementById("hCost3").innerHTML = convrt(hCost[3]);
    }
    //hero 4 unlocks
    if (stage > 0 && hero4Unlocked == false)
    {
        hero4Unlocked = true;
        document.getElementById("hero4Button").addEventListener("click", buyHero4);
        document.getElementById("hCost4").innerHTML = convrt(hCost[4]);
    }
    //hero 5 unlocks
    if (stage > 0 && hero5Unlocked == false)
    {
        hero5Unlocked = true;
        document.getElementById("hero5Button").addEventListener("click", buyHero5);
        document.getElementById("hCost5").innerHTML = convrt(hCost[5]);
    }
    //hero 6 unlocks
    if (stage > 0 && hero6Unlocked == false)
    {
        hero6Unlocked = true;
        document.getElementById("hero6Button").addEventListener("click", buyHero6);
        document.getElementById("hCost6").innerHTML = convrt(hCost[6]);
    }
    //hero 7 unlocks
    if (stage > 0 && hero7Unlocked == false)
    {
        hero7Unlocked = true;
        document.getElementById("hero7Button").addEventListener("click", buyHero7);
        document.getElementById("hCost7").innerHTML = convrt(hCost[7]);
    }
}
//Hero 1
var hero1Unlocked = false;
var hero1Bought = false;

var hM1Cost1 = 500;
var h1M1 = false;
var hM2Cost1 = 2000;
var h1M2 = false;
var hM3Cost1 = 5e4;
var h1M3 = false;
var hM4Cost1 = 2.5e5;
var h1M4 = false;
hDmgMult[1] = 1;

heroDamage[1] = heroDamage[1] * heroDamageMult * hDmgMult[1];

function buyHero1()
{
    if (gold >= hCost[1])
    {
        hero1Bought = true;
        gold -= hCost[1];
        hCost[1] += ((hCostBase[1]/10) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        setInterval(heroAttack1, heroAtkCooldown[1]*1000);
        console.log("hero 1 unlocked");
        document.getElementById("hero1Button").removeEventListener("click", buyHero1);
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
        document.getElementById("hero1Button").addEventListener("click", upgradeHero1);
    }

    
}
function heroAttack1()
{
    health = (health - heroDamage[1]).toPrecision(3);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero1Sprite").classList.add("attacking1");}, 0);
    setTimeout(function(){document.getElementById("hero1Sprite").classList.remove("attacking1");}, 100);
    setTimeout(dealDamage, 100);
}
function upgradeHero1()
{
    if (gold >= hCost[1])
    {
        gold -= hCost[1];
        heroDamage[1] = heroDamage[1] + (heroDamageMult * hDmgMult[1] * (heroBaseDamage[1]/5) * 1.01**(heroLvl[1]));
        hCost[1] += ((hCostBase[1]/10) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        heroLvlMult(1);
        
    }
}
function buyHero1Milestone()
{
    if (h1M1 == false && gold >= hM1Cost1 && heroLvl[1] >= 10)
    {
        gold -= hM1Cost1;
        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.2;
        }
        heroDamageMult = heroDamageMult * 1.2;
        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        h1M1 = true;
        console.log('Milestone 1 Purchased');
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 30)";
        document.getElementById("hMCost1").innerHTML = convrt(hM2Cost1);
        heroUnlockCheck();
        displayStats();
    }
    if (h1M2 == false && gold >= hM2Cost1 && heroLvl[1] >= 30 && h1M1 == true)
    {
        gold -= hM2Cost1;
        allGoldMult *= 1.5;
        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 60)";
        document.getElementById("hMCost1").innerHTML = convrt(hM3Cost1);
        console.log('Milestone 2 Purchased');
        h1M2 = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M3 == false && gold >= hM3Cost1 && heroLvl[1] >= 60 && h1M1 == true && h1M2 == true)
    {
        gold -= hM3Cost1;
        allDamageMult *= 1.1;

        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.1;
        }
        damage *= 1.1;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 100)";
        document.getElementById("hMCost1").innerHTML = convrt(hM4Cost1);
        console.log('Milestone 3 Purchased');
        h1M3 = true;
        heroUnlockCheck();
        displayStats();
    }

        
}

//Hero 2
var hero2Unlocked = false;
var hero2Bought = false;
hDmgMult[2] = 1;

heroDamage[2] = heroDamage[2] * heroDamageMult * hDmgMult[2];

function buyHero2()
{
    if (gold >= hCost[2])
    {
        hero2Bought = true;
        gold -= hCost[2];
        hCost[2] += ((hCostBase[2]/10) * 1.06**(heroLvl[2]));
        heroLvl[2]++;
        displayStats();
        setInterval(heroAttack2, heroAtkCooldown[2]*1000);
        console.log("hero 2 unlocked");
        document.getElementById("hero2Button").removeEventListener("click", buyHero2);
        document.getElementById("hero2Locked").innerHTML = "Upgrade"
        document.getElementById("hero2Button").addEventListener("click", upgradeHero2);
    }

    
}
function heroAttack2()
{
    health = (health - (heroDamage[2])).toFixed(2);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero2Sprite").classList.add("attacking2");}, 0);
    setTimeout(function(){document.getElementById("hero2Sprite").classList.remove("attacking2");}, 100);
    setTimeout(dealDamage, 100);
}
function upgradeHero2()
{
    if (gold >= hCost[2])
    {
        gold -= hCost[2];
        heroDamage[2] = heroDamage[2] + (heroDamageMult * hDmgMult[2] * (heroBaseDamage[2]/5) * 1.01**(heroLvl[2]));
        hCost[2] += ((hCostBase[2]/10) * 1.06**(heroLvl[2]));
        heroLvl[2]++;
        displayStats();
        heroLvlMult(2);
    }
}

//Hero 3
var hero3Unlocked = false;
var hero3Bought = false;
hDmgMult[3] = 1;

heroDamage[3] = heroDamage[3] * heroDamageMult * hDmgMult[3];

function buyHero3()
{
    if (gold >= hCost[3])
    {
        hero3Bought = true;
        gold -= hCost[3];
        hCost[3] += ((hCostBase[3]/10) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        setInterval(heroAttack3, heroAtkCooldown[3]*1000);
        console.log("hero 3 unlocked");
        document.getElementById("hero3Button").removeEventListener("click", buyHero3);
        document.getElementById("hero3Locked").innerHTML = "Upgrade"
        document.getElementById("hero3Button").addEventListener("click", upgradeHero3);
    }

    
}
function heroAttack3()
{
    health = (health - (heroDamage[3])).toFixed(2);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero3Sprite").classList.add("attacking3");}, 0);
    setTimeout(function(){document.getElementById("hero3Sprite").classList.remove("attacking3");}, 300);
    setTimeout(dealDamage, 100);
}
function upgradeHero3()
{
    if (gold >= hCost[3])
    {
        gold -= hCost[3];
        heroDamage[3] = heroDamage[3] + (heroDamageMult * hDmgMult[3] * (heroBaseDamage[3]/5) * (1.01**(heroLvl[3])));
        hCost[3] += ((hCostBase[3]/10) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        heroLvlMult(3);
    }
}

//Hero 4
var hero4Unlocked = false;
var hero4Bought = false;
hDmgMult[4] = 1;

heroDamage[4] = heroDamage[4] * heroDamageMult * hDmgMult[4];

function buyHero4()
{
    if (gold >= hCost[4])
    {
        hero4Bought = true;
        gold -= hCost[4];
        hCost[4] += ((hCostBase[4]/10) * (1.06**(heroLvl[4])));
        heroLvl[4]++;
        displayStats();
        setInterval(heroAttack4, heroAtkCooldown[4]*1000);
        console.log("hero 4 unlocked");
        document.getElementById("hero4Button").removeEventListener("click", buyHero4);
        document.getElementById("hero4Locked").innerHTML = "Upgrade"
        document.getElementById("hero4Button").addEventListener("click", upgradeHero4);
    }

    
}
function heroAttack4()
{
    health = (health - (heroDamage[4])).toFixed(2);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero4Sprite").classList.add("attacking4");}, 0);
    setTimeout(function(){document.getElementById("hero4Sprite").classList.remove("attacking4");}, 100);
    setTimeout(dealDamage, 100);
}
function upgradeHero4()
{
    if (gold >= hCost[4])
    {
        gold -= hCost[4];
        heroDamage[4] = heroDamage[4] + (heroDamageMult * hDmgMult[4] * (heroBaseDamage[4]/5) * (1.01**(heroLvl[4])));
        hCost[4] += ((hCostBase[4]/10) * (1.06**(heroLvl[4])));
        heroLvl[4]++;
        displayStats();
        heroLvlMult(4);

    }
}

//Hero 5
var hero5Unlocked = false;
var hero5Bought = false;
hDmgMult[5] = 1;

heroDamage[5] = heroDamage[5] * heroDamageMult * hDmgMult[5];

function buyHero5()
{
    if (gold >= hCost[5])
    {
        hero5Bought = true;
        gold -= hCost[5];
        hCost[5] += ((hCostBase[5]/10) * (1.06**(heroLvl[5])));
        heroLvl[5]++;
        displayStats();
        setInterval(heroAttack5, heroAtkCooldown[5]*1000);
        console.log("hero 5 unlocked");
        document.getElementById("hero5Button").removeEventListener("click", buyHero5);
        document.getElementById("hero5Locked").innerHTML = "Upgrade"
        document.getElementById("hero5Button").addEventListener("click", upgradeHero5);
    }

    
}
function heroAttack5()
{
    health = (health - (heroDamage[5])).toFixed(2);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero5Sprite").classList.add("attacking5");}, 0);
    setTimeout(function(){document.getElementById("hero5Sprite").classList.remove("attacking5");}, 100);
    setTimeout(dealDamage, 100);
}
function upgradeHero5()
{
    if (gold >= hCost[5])
    {
        gold -= hCost[5];
        heroDamage[5] = heroDamage[5] + (heroDamageMult * hDmgMult[5] * (heroBaseDamage[5]/5) * (1.01**(heroLvl[5])));
        hCost[5] += ((hCostBase[5]/10) * (1.06**(heroLvl[5]))); 
        heroLvl[5]++;
        displayStats();
        heroLvlMult(5);

    }
}

//Hero 6
var hero6Unlocked = false;
var hero6Bought = false;
hDmgMult[6] = 1;

heroDamage[6] = heroDamage[6] * heroDamageMult * hDmgMult[6];

function buyHero6()
{
    if (gold >= hCost[6])
    {
        hero6Bought = true;
        gold -= hCost[6];
        hCost[6] += ((hCostBase[6]/10) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        setInterval(heroAttack6, heroAtkCooldown[6]*1000);
        console.log("hero 6 unlocked");
        document.getElementById("hero6Button").removeEventListener("click", buyHero6);
        document.getElementById("hero6Locked").innerHTML = "Upgrade"
        document.getElementById("hero6Button").addEventListener("click", upgradeHero6);
    }

    
}
function heroAttack6()
{
    health = (health - (heroDamage[6])).toPrecision(3);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero6Sprite").classList.add("attacking6");}, 0);
    setTimeout(function(){document.getElementById("hero6Sprite").classList.remove("attacking6");}, 100);
    setTimeout(dealDamage, 100);
}
function upgradeHero6()
{
    if (gold >= hCost[6])
    {
        gold -= hCost[6];
        heroDamage[6] = heroDamage[6] + (heroDamageMult * hDmgMult[6] * (heroBaseDamage[6]/5) * (1.01**(heroLvl[6])));
        hCost[6] += ((hCostBase[6]/10) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        heroLvlMult(6);

    }
}
//Hero 7
var hero7Unlocked = false;
var hero7Bought = false;
hDmgMult[7] = 1;

heroDamage[7] = heroDamage[7] * heroDamageMult * hDmgMult[7];

function buyHero7()
{
    if (gold >= hCost[7])
    {
        hero7Bought = true;
        gold -= hCost[7];
        hCost[7] += ((hCostBase[7]/10) * (1.06**(heroLvl[7])));
        heroLvl[7]++;
        displayStats();
        setInterval(heroAttack7, heroAtkCooldown[7]*1000);
        console.log("hero 7 unlocked");
        document.getElementById("hero7Button").removeEventListener("click", buyHero7);
        document.getElementById("hero7Locked").innerHTML = "Upgrade"
        document.getElementById("hero7Button").addEventListener("click", upgradeHero7);
    }

    
}
function heroAttack7()
{
    health = (health - (heroDamage[7])).toPrecision(3);
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero7Sprite").classList.add("attacking7");}, 0);
    setTimeout(function(){document.getElementById("hero7Sprite").classList.remove("attacking7");}, 200);
    setTimeout(dealDamage, 100);
}
function upgradeHero7()
{
    if (gold >= hCost[7])
    {
        gold -= hCost[7];
        heroDamage[7] = heroDamage[7] + (heroDamageMult * hDmgMult[7] * (heroBaseDamage[7]/5) * (1.01**(heroLvl[7])));
        hCost[7] += ((hCostBase[7]/10) * (1.06**(heroLvl[7])));
        heroLvl[7]++;
        displayStats();
        heroLvlMult(7);

    }
}