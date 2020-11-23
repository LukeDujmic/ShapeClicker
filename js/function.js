const gameRunning = true;
var health = 100;
var clickDamageMult = 1;
var clickCritMult = 3;
var clickCritChance = 2;
var heroDamageMult = 1;
var allGoldMult = 1;
var allDamageMult = 1;

var damage = 5e0;
//var heroDamage = [0, 10, 40, 4000, 17500, 250000];
var heroLvl = [1000, 0, 0, 0, 0, 0, 0];
var hDmgMult = [0, 1, 1, 1, 1, 1, 1];

const hCostBase = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7];
var hCost = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7];
var heroAtkCooldown = [0, 2, 0.5, 5, 1.75, 2.5, 1.5];
var heroBaseDamage = [0]
var heroDamage = [0];
for (let i = 1; i < hCost.length; i++)
{
    let z = 1;
    z = (hCost[i] * z * heroAtkCooldown[i]) / 4
    heroDamage.push(z);
    heroBaseDamage.push(z);
}

var stage = 1;
var stageProgress = 1;
var boss = false;
var gold = 0;
var clickUpCost = 5;
var clickLevel = 1;

var maxHealth = health;

console.log(document.getElementById("healthStat").style.backgroundSize);

document.getElementById("enemy").addEventListener('click', clickDamage);

// number abbreviations converter
var abbr = ['','K','M','B','T',
'aaa','aab','aac','aad','aae','aaf','aag','aah','aai','aaj','aak','aal','aam','aan','aao','aap','aaq','aar','aas','aat','aau','aav','aaw','aax','aay','aaz',
'aba','abb','abc','abd','abe','abf','abg','abh','abi','abj','abk','abl','abm','abn','abo','abp','abq','abr','abs','abt','abu','abv','abw','abx','aby','abz',
'aca','acb','acc','acd','ace','acf','acg','ach','aci','acj','ack','acl','acm','acn','aco','acp','acq','acr','acs','act','acu','acv','acw','acx','acy','acz',
'ada','adb','adc','add','ade','adf','adg','adh','adi','adj','adk','adl','adm','adn','ado','adp','adq','adr','ads','adt','adu','adv','adw','adx','ady','adz',
'aea','aeb','aec','aed','aee','aef','aeg','aeh','aei','aej','aek','ael','aem','aen','aeo','aep','aeq','aer','aes','aet','aeu','aev','aew','aex','aey','aez',
'afa','afb','afc','afd','afe','aff','afg','afh','afi','afj','afk','afl','afm','afn','afo','afp','afq','afr','afs','aft','afu','afv','afw','afx','afy','afz',
'aga','agb','agc','agd','age','agf','agg','agh','agi','agj','agk','agl','agm','agn','ago','agp','agq','agr','ags','agt','agu','agv','agw','agx','agy','agz',
'aha','ahb','ahc','ahd','ahe','ahf','ahg','ahh','ahi','ahj','ahk','ahl','ahm','ahn','aho','ahp','ahq','ahr','ahs','aht','ahu','ahv','ahw','ahx','ahy','ahz',
'aia','aib','aic','aid','aie','aif','aig','aih','aii','aij','aik','ail','aim','ain','aio','aip','aiq','air','ais','ait','aiu','aiv','aiw','aix','aiy','aiz',
'aja','ajb','ajc','ajd','aje','ajf','ajg','ajh','aji','ajj','ajk','ajl','ajm','ajn','ajo','ajp','ajq','ajr','ajs','ajt','aju','ajv','ajw','ajx','ajy','ajz',
'aka','akb','akc','akd','ake','akf','akg','akh','aki','akj','akk','akl','akm','akn','ako','akp','akq','akr','aks','akt','aku','akv','akw','akx','aky','akz',
'ala','alb','alc','ald','ale','alf','alg','alh','ali','alj','alk','all','alm','aln','alo','alp','alq','alr','als','alt','alu','alv','alw','alx','aly','alz',
'ama','amb','amc','amd','ame','amf','amg','amh','ami','amj','amk','aml','amm','amn','amo','amp','amq','amr','ams','amt','amu','amv','amw','amx','amy','amz',
'ana','anb','anc','and','ane','anf','ang','anh','ani','anj','ank','anl','anm','ann','ano','anp','anq','anr','ans','ant','anu','anv','anw','anx','any','anz',
'aoa','aob','aoc','aod','aoe','aof','aog','aoh','aoi','aoj','aok','aol','aom','aon','aoo','aop','aoq','aor','aos','aot','aou','aov','aow','aox','aoy','aoz',
'apa','apb','apc','apd','ape','apf','apg','aph','api','apj','apk','apl','apm','apn','apo','app','apq','apr','aps','apt','apu','apv','apw','apx','apy','apz',
'aqa','aqb','aqc','aqd','aqe','aqf','aqg','aqh','aqi','aqj','aqk','aql','aqm','aqn','aqo','aqp','aqq','aqr','aqs','aqt','aqu','aqv','aqw','aqx','aqy','aqz',
'ara','arb','arc','ard','are','arf','arg','arh','ari','arj','ark','arl','arm','arn','aro','arp','arq','arr','ars','art','aru','arv','arw','arx','ary','arz',
'asa','asb','asc','asd','ase','asf','asg','ash','asi','asj','ask','asl','asm','asn','aso','asp','asq','asr','ass','ast','asu','asv','asw','asx','asy','asz',
'ata','atb','atc','atd','ate','atf','atg','ath','ati','atj','atk','atl','atm','atn','ato','atp','atq','atr','ats','att','atu','atv','atw','atx','aty','atz',
'aua','aub','auc','aud','aue','auf','aug','auh','aui','auj','auk','aul','aum','aun','auo','aup','auq','aur','aus','aut','auu','auv','auw','aux','auy','auz',
'ava','avb','avc','avd','ave','avf','avg','avh','avi','avj','avk','avl','avm','avn','avo','avp','avq','avr','avs','avt','avu','avv','avw','avx','avy','avz',
'awa','awb','awc','awd','awe','awf','awg','awh','awi','awj','awk','awl','awm','awn','awo','awp','awq','awr','aws','awt','awu','awv','aww','awx','awy','awz',
'axa','axb','axc','axd','axe','axf','axg','axh','axi','axj','axk','axl','axm','axn','axo','axp','axq','axr','axs','axt','axu','axv','axw','axx','axy','axz',
'aya','ayb','ayc','ayd','aye','ayf','ayg','ayh','ayi','ayj','ayk','ayl','aym','ayn','ayo','ayp','ayq','ayr','ays','ayt','ayu','ayv','ayw','ayx','ayy','ayz',
'aza','azb','azc','azd','aze','azf','azg','azh','azi','azj','azk','azl','azm','azn','azo','azp','azq','azr','azs','azt','azu','azv','azw','azx','azy','azz',
]

var l = 1000000n;

j = Number(l);

console.log(j);

const convrt = n => { 
    if (n < 1e3) return +(n / 1e0).toPrecision(3); 
    for (var i = 1; i < abbr.length; i++)
    {
        if (n >= (10**(i*3)) && n < (10**((i*3)+3))) return +(n / (10**((i*3)))).toPrecision(3) + abbr[i];
    }
}
function clickDamage()
{
    health = (health - damage).toPrecision(3);
    if (health <= 0)
    {
        health = 0;
    }
    dealDamage();
}

/* calculation stuff */
function min(x, y)
{
    if (x >= y)
    {
        x = y
    }
    return x;
}
function max(x, y)
{
    if (x <= y)
    {
        x = 0;
    }
    else
    {
        x;
    }
    return x;
}



function dealDamage()
{
    heroUnlockCheck();
    document.getElementById("enemyHealth").innerHTML = health;
    if (health <= 0 && boss == false)
    {
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
        maxHealth = health;
        gold += ((maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9) * allGoldMult));

        document.getElementById("enemy").classList.add("killed");
        document.getElementById("enemy").removeEventListener("click", clickDamage);
        setTimeout(function(){document.getElementById("enemy").classList.remove("killed");}, 400);
        setTimeout(function(){document.getElementById("enemy").addEventListener("click", clickDamage)}, 300);

        stageProgress++;
        displayStats();
    }
    if (stageProgress > 5 && boss == false)
    {
        boss = true;
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * 4);
        maxHealth = health;
        document.getElementById("enemy").style.width = "20em";
        document.getElementById("enemy").style.height = "20em";
        document.getElementById("enemy").style.top = "42.5%";
        displayStats();
    }
    if (boss == true && health <= 0)
    {
        document.getElementById("enemy").style.width = "15em";
        document.getElementById("enemy").style.height = "15em";
        document.getElementById("enemy").style.top = "50%";

        gold += ((maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9) * allGoldMult * 4));

        document.getElementById("enemy").classList.add("killed");
        document.getElementById("enemy").removeEventListener("click", clickDamage);
        setTimeout(function(){document.getElementById("enemy").classList.remove("killed");}, 300);
        setTimeout(function(){document.getElementById("enemy").addEventListener("click", clickDamage)}, 300);
        boss = false;
        stageProgress = 1;
        stage++;
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
        maxHealth = health;
        displayStats();
        heroUnlockCheck();
    }

}

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
        hCost[1] += ((hCostBase[1]/4) * 1.06**(heroLvl[1]));
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
        heroDamage[1] = heroDamage[1] + (heroDamageMult * hDmgMult[1] * heroBaseDamage[1] * 1.01**(heroLvl[1]));
        hCost[1] += ((hCostBase[1]/4) * 1.06**(heroLvl[1]));
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
        hCost[2] += ((hCostBase[2]/4) * 1.06**(heroLvl[2]));
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
        heroDamage[2] = heroDamage[2] + (heroDamageMult * hDmgMult[2] * heroBaseDamage[2] * 1.01**(heroLvl[2]));
        hCost[2] += ((hCostBase[2]/4) * 1.06**(heroLvl[2]));
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
        hCost[3] += ((hCostBase[3]/4) * (1.06**(heroLvl[3])));
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
        heroDamage[3] = heroDamage[3] + (heroDamageMult * hDmgMult[3] * heroBaseDamage[3] * (1.01**(heroLvl[3])));
        hCost[3] += ((hCostBase[3]/4) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        heroLvlMult(3);a 
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
        hCost[4] += ((hCostBase[4]/4) * (1.06**(heroLvl[4])));
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
        heroDamage[4] = heroDamage[4] + (heroDamageMult * hDmgMult[4] * heroBaseDamage[4] * (1.01**(heroLvl[4])));
        hCost[4] += ((hCostBase[4]/4) * (1.06**(heroLvl[4])));
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
        hCost[5] += ((hCostBase[5]/4) * (1.06**(heroLvl[5])));
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
        heroDamage[5] = heroDamage[5] + (heroDamageMult * hDmgMult[5] * heroBaseDamage[5] * (1.01**(heroLvl[5])));
        hCost[5] += ((hCostBase[5]/4) * (1.06**(heroLvl[5]))); 
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
        hCost[6] += ((hCostBase[6]/4) * (1.06**(heroLvl[6])));
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
        heroDamage[6] = heroDamage[6] + (heroDamageMult * hDmgMult[6] * heroBaseDamage[6] * (1.01**(heroLvl[6])));
        hCost[6] += ((hCostBase[6]/4) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        heroLvlMult(6);

    }
}

//hero damage mini milestones (i.e. at lvl 25 for ANY hero their damage doubles)
function heroLvlMult(i)
{
    if (heroLvl[i] == 10)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 20)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 35)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 50)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 75)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 100)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 120)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 140)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 160)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 180)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 200)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 225)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 250)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 275)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 300)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 325)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 350)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 375)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 400)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 430)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 460)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 500)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 530)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 560)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 600)
    {
        hDmgMult[i] *= 4;
        heroDamage[i] *= 4;
    }
    if (heroLvl[i] == 630)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 660)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 700)
    {
        hDmgMult[i] *= 4;
        heroDamage[i] *= 4;
    }
    if (heroLvl[i] == 730)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 760)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 800)
    {
        hDmgMult[i] *= 4;
        heroDamage[i] *= 4;
    }
    if (heroLvl[i] == 830)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
}


// click upgrades

function upgrade()
{
    if (gold >= clickUpCost)
    {
        gold -= clickUpCost;
        damage += (allDamageMult * clickDamageMult * 5 * (1.01**(clickLevel - 1)));
        clickUpCost += (10 * (1.07**(clickLevel - 1)));
        clickLevel++;
        displayStats();
        if (clickLevel == 10)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 25)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 50)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 75)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 100)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
        if (clickLevel == 125)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 145)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 165)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 185)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 200)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
    }
}

//stat displaying

document.getElementById("enemyHealth").innerHTML = health;
document.getElementById("damage").innerHTML = damage.toFixed(2);
document.getElementById("stage").innerHTML = stage;
document.getElementById("enemyNum").innerHTML = stageProgress+"/5";;
document.getElementById("gold").innerHTML = gold;
document.getElementById("clickLevel").innerHTML = clickLevel;
document.getElementById("cost").innerHTML = clickUpCost.toFixed(2);

document.getElementById("hCost1").innerHTML = "Unlock at Stage 1";
document.getElementById("hero1Lvl").innerHTML = heroLvl[1];
document.getElementById("hero1Damage").innerHTML = convrt(heroDamage[1]);

document.getElementById("hCost2").innerHTML = "Unlock at Stage 1";
document.getElementById("hero2Lvl").innerHTML = heroLvl[2];
document.getElementById("hero2Damage").innerHTML = convrt(heroDamage[2]);

document.getElementById("hCost3").innerHTML = "Unlock at Stage 1";
document.getElementById("hero3Lvl").innerHTML = heroLvl[3];
document.getElementById("hero3Damage").innerHTML = convrt(heroDamage[3]);

document.getElementById("hCost4").innerHTML = "Unlock at Stage 1";
document.getElementById("hero4Lvl").innerHTML = heroLvl[4];
document.getElementById("hero4Damage").innerHTML = convrt(heroDamage[4]);

document.getElementById("hCost5").innerHTML = "Unlock at Stage 1";
document.getElementById("hero5Lvl").innerHTML = heroLvl[5];
document.getElementById("hero5Damage").innerHTML = convrt(heroDamage[5]);

document.getElementById("hMCost1").innerHTML = hM1Cost1;

function displayStats()
{
    heroUnlockCheck();

    document.getElementById("enemyHealth").innerHTML = convrt(health);
    document.getElementById("damage").innerHTML = convrt(damage);
    document.getElementById("stage").innerHTML = stage;
    document.getElementById("enemyNum").innerHTML = stageProgress+"/5";;
    if (boss == true)
    {
        document.getElementById("enemyNum").innerHTML = "Boss";
    }
    document.getElementById("gold").innerHTML = convrt(gold);
    document.getElementById("clickLevel").innerHTML = clickLevel;
    document.getElementById("cost").innerHTML = convrt(clickUpCost);
    if (stage >= 1)
    {
        document.getElementById("hCost1").innerHTML = convrt(hCost[1]);
        document.getElementById("hCost2").innerHTML = convrt(hCost[2]);
        document.getElementById("hCost3").innerHTML = convrt(hCost[3]);
        document.getElementById("hCost4").innerHTML = convrt(hCost[4]);
        document.getElementById("hCost5").innerHTML = convrt(hCost[5]);
        document.getElementById("hCost6").innerHTML = convrt(hCost[6]);
    }
    document.getElementById("hero1Lvl").innerHTML = heroLvl[1];
    document.getElementById("hero1Damage").innerHTML = convrt(heroDamage[1]);

    document.getElementById("hero2Lvl").innerHTML = heroLvl[2];
    document.getElementById("hero2Damage").innerHTML = convrt(heroDamage[2]);

    document.getElementById("hero3Lvl").innerHTML = heroLvl[3];
    document.getElementById("hero3Damage").innerHTML = convrt(heroDamage[3]);

    document.getElementById("hero4Lvl").innerHTML = heroLvl[4];
    document.getElementById("hero4Damage").innerHTML = convrt(heroDamage[4]);

    document.getElementById("hero5Lvl").innerHTML = heroLvl[5];
    document.getElementById("hero5Damage").innerHTML = convrt(heroDamage[5]);

    document.getElementById("hero6Lvl").innerHTML = heroLvl[6];
    document.getElementById("hero6Damage").innerHTML = convrt(heroDamage[6]);

    /* Health Bar Stuff */
    document.getElementById("healthStat").style.backgroundSize = ((health/maxHealth) * 100)+"% 100%";

}

function multiUpgrade()
{
    var h = prompt("Which Hero would you like to upgrade? (type in their number value)");
    var t = prompt("How many times would you like to upgrade them?");
    if (h == 1 && hero1Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero1();
        }
    }
    if (h == 2 && hero2Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero2();
        }
    }
    if (h == 3 && hero3Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero3();
        }
    }
    if (h == 4 && hero4Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero4();
        }
    }
    if (h == 5 && hero5Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero5();
        }
    }
    if (h == 6 && hero6Bought == true)
    {
        for (i = 0; i < t; i++)
        {
            upgradeHero6();
        }
    }
}

function goldSpawn()
{
    let goldAmount1 = prompt("Base value of gold [(x) * 10 ** y]");
    let goldAmount2 = prompt("Amount of zeroes in gold value [x * 10 ** (y)]");
    parseInt(goldAmount1);
    parseInt(goldAmount2);
    gold = goldAmount1 * 10 ** goldAmount2
}
function stageSelect()
{
    let stageSelect = prompt("Which stage do you want to go to?");
    stage = parseInt(stageSelect);
    health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
    stageProgress = 1;
}
setInterval(displayStats, 1);

