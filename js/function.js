const gameRunning = true;
var gameLoaded = false;
var health = 100;
var clickDamageMult = 1;
var clickCritMult = 3;
var clickCritChance = 2;
var heroDamageMult = 1;
var allGoldMult = 1;
var allDamageMult = 1;
var bossGoldMult = 1;
var regGoldMult = 1;
var goldenGoldMult = 1;
var isGolden = false;
var isReg = true;
var enemyDead = false;


var damage = 5e0;
//var heroDamage = [0, 10, 40, 4000, 17500, 250000];
var heroLvl = [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var hDmgMult = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const heroNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var heroAtk = [0, 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler'];

var hCostBase = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13];
var hCost = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13];
var heroAtkCooldown = [0, 2, 0.5, 5, 1.75, 2.5, 1.5, 6, 1.25, 1];
var heroUnlocked = [true, false, false, false, false, false, false, false, false, false];
var heroBought = [true, false, false, false, false, false, false, false, false, false];
var heroBaseDamage = [0];
var heroDamage = [0];

var heroColorDmg = [0, 1, 1, 1, 1, 1, 1];
var rangedHeroDmg = 1;
var meleeHeroDmg = 1;
// red, blue, yellow, orange, purple, green
for (let i = 1; i < hCost.length; i++)
{
    let z = 1;
    z = (hCost[i] * 5 * z * heroAtkCooldown[i]) / 4 * ((1-23/1000*min(heroNumber[i], heroNumber.length))**min(heroNumber[i],heroNumber.length));
    heroDamage.push(z);
    heroBaseDamage.push(z);
}
var allHeroDmg = 0;
var aCostBase = [0, 1e3];
var aCost = [0, 1e3];
var aLvl = [0, 0];
var shapeRageMult = 1.5;

var stage = 1;
var stageProgress = 1;
var boss = false;
var gold = 0;
var clickUpCost = 5;
var clickLevel = 1;

var maxHealth = health;

var passSet = false;
var savePass;

function loadPass()
{
    savePass = JSON.parse(localStorage.getItem('savePass'));
    passSet = JSON.parse(localStorage.getItem('passSet'));
}

/*var ahd = setInterval(function(){
    allHeroDmg =  heroDamage[1] + heroDamage[2] + heroDamage[3] + heroDamage[4] + heroDamage[5] + heroDamage[6] + heroDamage[7];
}, 1)*/
console.log(document.getElementById("healthStat").style.backgroundSize);

document.getElementById("enemyArea").addEventListener('click', clickDamage);
document.getElementById("ability1").addEventListener('click', buyAbility1);

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
];

const convrt = n => { 
    if (n < 1e3 && n > 0) return +(n / 1e0).toPrecision(3); 
    if (n <= 0) return 0;
    for (var i = 1; i < abbr.length; i++)
    {
        if (n >= (10**(i*3)) && n < (10**((i*3)+3))) return +(n / (10**((i*3)))).toPrecision(3) + abbr[i];
    }
}
function clickDamage()
{
    if (enemyDead == false)
    {
        health = (health - damage).toPrecision(3);
    }
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
    document.getElementById("enemyHealth").innerHTML = convrt(health);
    if (health <= 0 && boss == false)
    {
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
        
        maxHealth = health;

        if (isGolden == true)
        {
            gold += ((8 * allGoldMult * goldenGoldMult * maxHealth * 0.04 + 0.0002 * (min(stage, 150)) * (Math.random() * 0.2 + 0.9)));
        }
        if (isReg == true)
        {
            gold += ((allGoldMult * regGoldMult * maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9)));
        }
        enemyCooldown();
        setTimeout(enemyStyle, 200);

        if (Math.ceil(Math.random(1) * 20) == 1)
        {
            document.getElementById("enemy").classList.add("golden");
            document.getElementById("enemy").classList.remove("regular");
            isGolden = true;
            isReg = false;
        }
        else
        {
            document.getElementById("enemy").classList.remove("golden");
            document.getElementById("enemy").classList.add("regular");
            isGolden = false;
            isReg = true;
        }
        stageProgress++;
        document.getElementById("enemyHealth").innerHTML = convrt(health);

        displayStats();
    }
    if (stageProgress > 5 && boss == false)
    {
        boss = true;
        isGolden = false;
        document.getElementById("enemy").classList.add("regular");
        document.getElementById("enemy").classList.remove("golden");
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * 4);
        maxHealth = health;
        enemyCooldown();
        setTimeout(enemyStyle, 200);
        document.getElementById("enemy").classList.add("boss");
        document.getElementById("enemyHealth").innerHTML = convrt(health);
        displayStats();
    }
    if (boss == true && health <= 0)
    {

        gold += ((allGoldMult * bossGoldMult * maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9) * 4));
        enemyCooldown();
        setTimeout(enemyStyle, 200);
        
        boss = false;
        document.getElementById("enemy").classList.remove("boss");
        stageProgress = 1;
        stage++;
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
        maxHealth = health;
        document.getElementById("enemyHealth").innerHTML = convrt(health);
        if (Math.ceil(Math.random(1) * 2) == 1)
        {
            document.getElementById("enemy").classList.add("golden");
            document.getElementById("enemy").classList.remove("regular");
            isGolden = true;
            isReg = false;
        }
        else
        {
            document.getElementById("enemy").classList.remove("golden");
            document.getElementById("enemy").classList.add("regular");
            isGolden = false;
            isReg = true;
        }
        displayStats();
        heroUnlockCheck();
    }

}

function enemyCooldown()
{
    enemyDead = true;
    document.getElementById("enemy").classList.add("killed");
    document.getElementById("enemyArea").removeEventListener("click", clickDamage);
    setTimeout(function(){document.getElementById("enemy").classList.remove("killed");}, 300);
    setTimeout(function(){enemyDead = false;}, 300);
    setTimeout(function(){document.getElementById("enemyArea").addEventListener("click", clickDamage)}, 300);
}

//enemy styles
function enemyStyle()
{
    let r = Math.ceil(Math.random(1) * 6);
    if (r == 1)
    {
        document.getElementById("enemy").classList.add("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
    }
    if (r == 2)
    {
        document.getElementById("enemy").classList.add("enemyCircle");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
    }
    if (r == 3)
    {
        document.getElementById("enemy").classList.add("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
    }
    if (r == 4)
    {
        document.getElementById("enemy").classList.add("enemySquircle");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
    }
    if (r == 5)
    {
        document.getElementById("enemy").classList.add("enemyPill");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyEgg");
    }
    if (r == 6)
    {
        document.getElementById("enemy").classList.add("enemyEgg");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
    }
    

}

//heroes

//Hero 1

var h1M = [true, false, false, false, false, false, false, false, false, false];
var hM1Cost1 = milestoneCost(1, 10);
var hM2Cost1 = milestoneCost(1, 30);
var hM3Cost1 = milestoneCost(1, 60);
var hM4Cost1 = milestoneCost(1, 100);
var hM5Cost1 = milestoneCost(1, 200);
var hM6Cost1 = milestoneCost(1, 300);
var hM7Cost1 = milestoneCost(1, 400);
var hM8Cost1 = milestoneCost(1, 500);
var hM9Cost1 = milestoneCost(1, 1000);
hDmgMult[1] = 1;

heroDamage[1] = heroDamage[1] * heroDamageMult * hDmgMult[1] * heroColorDmg[2] * meleeHeroDmg;

function buyHero1()
{
    if (gold >= hCost[1] && heroBought[1] == true)
    {
        gold -= hCost[1];
        heroDamage[1] = heroDamage[1] + (heroColorDmg[2] * meleeHeroDmg * heroDamageMult * hDmgMult[1] * (heroBaseDamage[1]/5) * 1.01**(heroLvl[1]));
        hCost[1] += ((hCostBase[1]/4) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        heroLvlMult(1);
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[1] && heroBought[1] == false)
    {
        heroBought[1] = true;
        gold -= hCost[1];
        hCost[1] += ((hCostBase[1]/4) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        heroAtk[1] = setInterval(heroAttack1, heroAtkCooldown[1]*1000);
        console.log("hero 1 unlocked");
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
    }
}
function heroAttack1()
{
    if (enemyDead == false)
    {
        health = (health - heroDamage[1]);
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero1Sprite").classList.add("attacking1");}, 0);
    setTimeout(function(){document.getElementById("hero1Sprite").classList.remove("attacking1");}, 100);
    setTimeout(dealDamage, 100);
}

function buyHero1Milestone()
{
    if (h1M[1] == false && gold >= hM1Cost1 && heroLvl[1] >= 10)
    {
        gold -= hM1Cost1;
        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.2;
        }
        heroDamageMult = heroDamageMult * 1.2;
        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        h1M[1] = true;
        console.log('Milestone 1 Purchased');
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[2] == false && gold >= hM2Cost1 && heroLvl[1] >= 30 && h1M[1] == true)
    {
        gold -= hM2Cost1;
        allGoldMult *= 1.1;
        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 2 Purchased');
        h1M[2] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[3] == false && gold >= hM3Cost1 && heroLvl[1] >= 60 && h1M[1] == true && h1M[2] == true)
    {
        gold -= hM3Cost1;
        allDamageMult *= 1.1;

        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.1;
        }
        damage *= 1.1;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 3 Purchased');
        h1M[3] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[4] == false && gold >= hM4Cost1 && heroLvl[1] >= 100 && h1M[1] == true && h1M[2] == true && h1M[3] == true)
    {
        gold -= hM4Cost1;
        clickDamageMult *= 1.2;

        damage *= 1.2;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 4 Purchased');
        h1M[4] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[5] == false && gold >= hM5Cost1 && heroLvl[1] >= 200 && h1M[1] == true && h1M[2] == true && h1M[3] == true && h1M[4] == true)
    {
        gold -= hM5Cost1;
        heroBlueMultiplier(1.25);
        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 5 Purchased');
        h1M[5] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[6] == false && gold >= hM6Cost1 && heroLvl[1] >= 300 && h1M[1] == true && h1M[2] == true && h1M[3] == true && h1M[4] == true && h1M[5] == true)
    {
        gold -= hM6Cost1;
        allGoldMult *= 1.1;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 6 Purchased');
        h1M[6] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[7] == false && gold >= hM7Cost1 && heroLvl[1] >= 400 && h1M[1] == true && h1M[2] == true && h1M[3] == true && h1M[4] == true && h1M[5] == true && h1M[6] == true)
    {
        gold -= hM7Cost1;
        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.1;
        }
        heroDamageMult = heroDamageMult * 1.1;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 7 Purchased');
        h1M[7] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[8] == false && gold >= hM8Cost1 && heroLvl[1] >= 500 && h1M[1] == true && h1M[2] == true && h1M[3] == true && h1M[4] == true && h1M[5] == true && h1M[6] == true && h1M[7] == true)
    {
        gold -= hM8Cost1;
        bossGoldMult *= 1.2;

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 8 Purchased');
        h1M[8] = true;
        heroUnlockCheck();
        displayStats();
    }

        
}

//Hero 2

var h2M = [true, false, false, false, false, false, false, false, false, false];
var hM1Cost2 = milestoneCost(2, 10);
var hM2Cost2 = milestoneCost(2, 30);
var hM3Cost2 = milestoneCost(2, 60);
var hM4Cost2 = milestoneCost(2, 100);
var hM5Cost2 = milestoneCost(2, 200);
var hM6Cost2 = milestoneCost(2, 300);
var hM7Cost2 = milestoneCost(2, 400);
var hM8Cost2 = milestoneCost(2, 500);
var hM9Cost2 = milestoneCost(2, 1000);

hDmgMult[2] = 1;

heroDamage[2] = heroDamage[2] * heroDamageMult * hDmgMult[2] * heroColorDmg[4] * rangedHeroDmg;

function buyHero2()
{
    if (gold >= hCost[2] && heroBought[2] == true)
    {
        gold -= hCost[2];
        heroDamage[2] = heroDamage[2] + (heroColorDmg[4] * rangedHeroDmg * heroDamageMult * hDmgMult[2] * (heroBaseDamage[2]/5) * 1.01**(heroLvl[2]));
        hCost[2] += ((hCostBase[2]/4) * 1.06**(heroLvl[2]));
        heroLvl[2]++;
        displayStats();
        heroLvlMult(2);
        document.getElementById("hero2Locked").innerHTML = "Upgrade"
    }
    if (gold >= hCost[2] && heroBought[2] == false)
    {
        heroBought[2] = true;
        gold -= hCost[2];
        hCost[2] += ((hCostBase[2]/4) * 1.06**(heroLvl[2]));
        heroLvl[2]++;
        displayStats();
        heroAtk[2] = setInterval(heroAttack2, heroAtkCooldown[2]*1000);
        console.log("hero 2 unlocked");
        document.getElementById("hero2Locked").innerHTML = "Upgrade"
    }

    
}
function heroAttack2()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[2]));
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero2Sprite").classList.add("attacking2");}, 0);
    setTimeout(function(){document.getElementById("hero2Sprite").classList.remove("attacking2");}, 100);
    setTimeout(dealDamage, 100);
}
function buyhero2Milestone()
{
    if (h2M[1] == false && gold >= hM1Cost2 && heroLvl[2] >= 10)
    {
        gold -= hM1Cost2;
        rangedHeroMultiplier(1.2);
        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        h2M[1] = true;
        console.log('Milestone 1 Purchased');
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[2] == false && gold >= hM2Cost2 && heroLvl[2] >= 30 && h2M[1] == true)
    {
        gold -= hM2Cost2;
        clickDamageMult *= 1.2;
        damage *= 1.2
        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 2 Purchased');
        h2M[2] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[3] == false && gold >= hM3Cost2 && heroLvl[2] >= 60 && h2M[1] == true && h2M[2] == true)
    {
        gold -= hM3Cost2;
        allGoldMult *= 1.1;

        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 3 Purchased');
        h2M[3] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[4] == false && gold >= hM4Cost2 && heroLvl[2] >= 100 && h2M[1] == true && h2M[2] == true && h2M[3] == true)
    {
        gold -= hM4Cost2;
        heroOrangeMultiplier(1.25);

        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 4 Purchased');
        h2M[4] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[5] == false && gold >= hM5Cost2 && heroLvl[2] >= 200 && h2M[1] == true && h2M[2] == true && h2M[3] == true && h2M[4] == true)
    {
        gold -= hM5Cost2;
        regGoldMult *= 1.2;
        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 5 Purchased');
        h2M[5] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[6] == false && gold >= hM6Cost2 && heroLvl[2] >= 300 && h2M[1] == true && h2M[2] == true && h2M[3] == true && h2M[4] == true && h2M[5] == true)
    {
        gold -= hM6Cost2;
        rangedHeroMultiplier(1.1);

        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 6 Purchased');
        h2M[6] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[7] == false && gold >= hM7Cost2 && heroLvl[2] >= 400 && h2M[1] == true && h2M[2] == true && h2M[3] == true && h2M[4] == true && h2M[5] == true && h2M[6] == true)
    {
        gold -= hM7Cost2;
        for (i = 1; i < heroDamage.length; i++)
        {
            heroDamage[i] *= 1.1;
        }
        heroDamageMult = heroDamageMult * 1.1;

        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 7 Purchased');
        h2M[7] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h2M[8] == false && gold >= hM8Cost2 && heroLvl[2] >= 500 && h2M[1] == true && h2M[2] == true && h2M[3] == true && h2M[4] == true && h2M[5] == true && h2M[6] == true && h2M[7] == true)
    {
        gold -= hM8Cost2;
        goldenGoldMult *= 1.2;
        document.getElementById("hero2Button2").removeEventListener("click", buyhero2Milestone); 
        console.log('Milestone 8 Purchased');
        h2M[8] = true;
        heroUnlockCheck();
        displayStats();
    }

        
}

//Hero 3

var h3M = [true, false, false, false, false, false, false, false, false, false];
var hM1Cost3 = milestoneCost(3, 10);
var hM2Cost3 = milestoneCost(3, 30);
var hM3Cost3 = milestoneCost(3, 60);
var hM4Cost3 = milestoneCost(3, 100);
var hM5Cost3 = milestoneCost(3, 200);
var hM6Cost3 = milestoneCost(3, 300);
var hM7Cost3 = milestoneCost(3, 400);
var hM8Cost3 = milestoneCost(3, 500);
var hM9Cost3 = milestoneCost(3, 1000);

hDmgMult[3] = 1;

heroDamage[3] = heroDamage[3] * heroDamageMult * hDmgMult[3] * heroColorDmg[1] * meleeHeroDmg;

function buyHero3()
{
    if (gold >= hCost[3] && heroBought[3] == true)
    {
        gold -= hCost[3];
        heroDamage[3] = heroDamage[3] + (heroColorDmg[1] * meleeHeroDmg * heroDamageMult * hDmgMult[3] * (heroBaseDamage[3]/5) * (1.01**(heroLvl[3])));
        hCost[3] += ((hCostBase[3]/4) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        heroLvlMult(3);
        document.getElementById("hero3Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[3] && heroBought[3] == false)
    {
        heroBought[3] = true;
        gold -= hCost[3];
        hCost[3] += ((hCostBase[3]/4) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        heroAtk[3] = setInterval(heroAttack3, heroAtkCooldown[3]*1000);
        console.log("hero 3 unlocked");
        document.getElementById("hero3Locked").innerHTML = "Upgrade";
    }

    
}
function heroAttack3()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[3]));
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero3Sprite").classList.add("attacking3");}, 0);
    setTimeout(function(){document.getElementById("hero3Sprite").classList.remove("attacking3");}, 300);
    setTimeout(dealDamage, 100);
}
function buyHero3Milestone()
{
    if (h3M[1] == false && gold >= hM1Cost3 && heroLvl[3] >= 10)
    {
        gold -= hM1Cost3;
        heroRedMultiplier(1.25);
        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        h3M[1] = true;
        console.log('Milestone 1 Purchased');
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[2] == false && gold >= hM2Cost3 && heroLvl[3] >= 30 && h3M[1] == true)
    {
        gold -= hM2Cost3;
        meleeHeroMultiplier(1.2);
        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 2 Purchased');
        h3M[2] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[3] == false && gold >= hM3Cost3 && heroLvl[3] >= 60 && h3M[1] == true && h3M[2] == true)
    {
        gold -= hM3Cost3;
        allGoldMult *= 1.1;

        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 3 Purchased');
        h3M[3] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[4] == false && gold >= hM4Cost3 && heroLvl[3] >= 100 && h3M[1] == true && h3M[2] == true && h3M[3] == true)
    {
        gold -= hM4Cost3;
        bossGoldMult *= 1.1;

        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 4 Purchased');
        h3M[4] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[5] == false && gold >= hM5Cost3 && heroLvl[3] >= 200 && h3M[1] == true && h3M[2] == true && h3M[3] == true && h3M[4] == true)
    {
        gold -= hM5Cost3;
        meleeHeroMultiplier(1.1);
        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 5 Purchased');
        h3M[5] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[6] == false && gold >= hM6Cost3 && heroLvl[3] >= 300 && h3M[1] == true && h3M[2] == true && h3M[3] == true && h3M[4] == true && h3M[5] == true)
    {
        gold -= hM6Cost3;
        clickCritMult *= 1.1;

        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 6 Purchased');
        h3M[6] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[7] == false && gold >= hM7Cost3 && heroLvl[3] >= 400 && h3M[1] == true && h3M[2] == true && h3M[3] == true && h3M[4] == true && h3M[5] == true && h3M[6] == true)
    {
        gold -= hM7Cost3;
        clickDamageMult *= 1.1;

        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 7 Purchased');
        h3M[7] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h3M[8] == false && gold >= hM8Cost3 && heroLvl[3] >= 500 && h3M[1] == true && h3M[2] == true && h3M[3] == true && h3M[4] == true && h3M[5] == true && h3M[6] == true && h3M[7] == true)
    {
        gold -= hM8Cost3;
        allDamageMultiplier(1.1);
        document.getElementById("hero3Button2").removeEventListener("click", buyHero3Milestone); 
        console.log('Milestone 8 Purchased');
        h3M[8] = true;
        heroUnlockCheck();
        displayStats();
    } 
}

//Hero 4
hDmgMult[4] = 1;

heroDamage[4] = heroDamage[4] * heroDamageMult * hDmgMult[4] * heroColorDmg[5] * rangedHeroDmg;

function buyHero4()
{
    if (gold >= hCost[4] && heroBought[4] == true)
    {
        gold -= hCost[4];
        heroDamage[4] = heroDamage[4] + (heroColorDmg[5] * rangedHeroDmg * heroDamageMult * hDmgMult[4] * (heroBaseDamage[4]/5) * (1.01**(heroLvl[4])));
        hCost[4] += ((hCostBase[4]/4) * (1.06**(heroLvl[4])));
        heroLvl[4]++;
        displayStats();
        heroLvlMult(4);
        document.getElementById("hero4Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[4] && heroBought[4] == false)
    {
        heroBought[4] = true;
        gold -= hCost[4];
        hCost[4] += ((hCostBase[4]/4) * (1.06**(heroLvl[4])));
        heroLvl[4]++;
        displayStats();
        heroAtk[4] = setInterval(heroAttack4, heroAtkCooldown[4]*1000);
        console.log("hero 4 unlocked");
        document.getElementById("hero4Locked").innerHTML = "Upgrade";
    }

    
}
function heroAttack4()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[4]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero4Sprite").classList.add("attacking4");}, 0);
    setTimeout(function(){document.getElementById("hero4Sprite").classList.remove("attacking4");}, 100);
    setTimeout(dealDamage, 100);
}

//Hero 5
hDmgMult[5] = 1;

heroDamage[5] = heroDamage[5] * heroDamageMult * hDmgMult[5] * heroColorDmg[6] * meleeHeroDmg;

function buyHero5()
{
    if (gold >= hCost[5] && heroBought[5] == true)
    {
        gold -= hCost[5];
        heroDamage[5] = heroDamage[5] + (heroColorDmg[6] * meleeHeroDmg * heroDamageMult * hDmgMult[5] * (heroBaseDamage[5]/5) * (1.01**(heroLvl[5])));
        hCost[5] += ((hCostBase[5]/4) * (1.06**(heroLvl[5]))); 
        heroLvl[5]++;
        displayStats();
        heroLvlMult(5);
        document.getElementById("hero5Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[5] && heroBought[5] == false)
    {
        heroBought[5] = true;
        gold -= hCost[5];
        hCost[5] += ((hCostBase[5]/4) * (1.06**(heroLvl[5])));
        heroLvl[5]++;
        displayStats();
        heroAtk[5] = setInterval(heroAttack5, heroAtkCooldown[5]*1000);
        console.log("hero 5 unlocked");
        document.getElementById("hero5Locked").innerHTML = "Upgrade";
    }
}
function heroAttack5()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[5]));
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero5Sprite").classList.add("attacking5");}, 0);
    setTimeout(function(){document.getElementById("hero5Sprite").classList.remove("attacking5");}, 100);
    setTimeout(dealDamage, 100);
}

//Hero 6
hDmgMult[6] = 1;
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */hacks = "fd3baj8faust";
heroDamage[6] = heroDamage[6] * heroDamageMult * hDmgMult[6] * heroColorDmg[3] * meleeHeroDmg;

function buyHero6()
{
    if (gold >= hCost[6] && heroBought[6] == true)
    {
        gold -= hCost[6];
        heroDamage[6] = heroDamage[6] + (heroColorDmg[3] * meleeHeroDmg * heroDamageMult * hDmgMult[6] * (heroBaseDamage[6]/5) * (1.01**(heroLvl[6])));
        hCost[6] += ((hCostBase[6]/4) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        heroLvlMult(6);
        document.getElementById("hero6Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[6] && heroBought[6] == false)
    {
        heroBought[6] = true;
        gold -= hCost[6];
        hCost[6] += ((hCostBase[6]/4) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        heroAtk[6] = setInterval(heroAttack6, heroAtkCooldown[6]*1000);
        console.log("hero 6 unlocked");
        document.getElementById("hero6Locked").innerHTML = "Upgrade";
    }
}
function heroAttack6()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[6]));
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero6Sprite").classList.add("attacking6");}, 0);
    setTimeout(function(){document.getElementById("hero6Sprite").classList.remove("attacking6");}, 100);
    setTimeout(dealDamage, 100);
}
//Hero 7
hDmgMult[7] = 1;

heroDamage[7] = heroDamage[7] * heroDamageMult * hDmgMult[7] * heroColorDmg[4] * rangedHeroDmg;

function buyHero7()
{
    if (gold >= hCost[7] && heroBought[7] == true)
    {
        gold -= hCost[7];
        heroDamage[7] = heroDamage[7] + (heroColorDmg[4] * rangedHeroDmg * heroDamageMult * hDmgMult[7] * (heroBaseDamage[7]/5) * (1.01**(heroLvl[7])));
        hCost[7] += ((hCostBase[7]/4) * (1.06**(heroLvl[7])));
        heroLvl[7]++;
        displayStats();
        heroLvlMult(7);
        document.getElementById("hero7Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[7] && heroBought[7] == false)
    {
        heroBought[7] = true;
        gold -= hCost[7];
        hCost[7] += ((hCostBase[7]/4) * (1.06**(heroLvl[7])));
        heroLvl[7]++;
        displayStats();
        heroAtk[7] = setInterval(heroAttack7, heroAtkCooldown[7]*1000);
        console.log("hero 7 unlocked");
        document.getElementById("hero7Locked").innerHTML = "Upgrade";
    }
}
function heroAttack7()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[7]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero7Sprite").classList.add("attacking7");}, 0);
    setTimeout(function(){document.getElementById("hero7Sprite").classList.remove("attacking7");}, 200);
    setTimeout(dealDamage, 100);
}

//Hero 8
hDmgMult[8] = 1;

heroDamage[8] = heroDamage[8] * heroDamageMult * hDmgMult[8] * heroColorDmg[5] * rangedHeroDmg;

function buyHero8()
{
    if (gold >= hCost[8] && heroBought[8] == true)
    {
        gold -= hCost[8];
        heroDamage[8] = heroDamage[8] + (heroColorDmg[5] * rangedHeroDmg * heroDamageMult * hDmgMult[8] * (heroBaseDamage[8]/5) * (1.01**(heroLvl[8])));
        hCost[8] += ((hCostBase[8]/4) * (1.06**(heroLvl[8])));
        heroLvl[8]++;
        displayStats();
        heroLvlMult(8);
        document.getElementById("hero8Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[8] && heroBought[8] == false)
    {
        heroBought[8] = true;
        gold -= hCost[8];
        hCost[8] += ((hCostBase[8]/4) * (1.06**(heroLvl[8])));
        heroLvl[8]++;
        displayStats();
        heroAtk[8] = setInterval(heroAttack8, heroAtkCooldown[8]*1000);
        console.log("hero 8 unlocked");
        document.getElementById("hero8Locked").innerHTML = "Upgrade";
    }

    
}
function heroAttack8()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[8]));
    }
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero8Sprite").classList.add("attacking8");}, 0);
    setTimeout(function(){document.getElementById("hero8Sprite").classList.remove("attacking8");}, 150);
    setTimeout(dealDamage, 100);
}

//Hero 9
hDmgMult[9] = 1;

heroDamage[9] = heroDamage[9] * heroDamageMult * hDmgMult[9] * heroColorDmg[1] * meleeHeroDmg;

function buyHero9()
{
    if (gold >= hCost[9] && heroBought[9] == true)
    {
        gold -= hCost[9];
        heroDamage[9] = heroDamage[9] + (heroColorDmg[1] * meleeHeroDmg * heroDamageMult * hDmgMult[9] * (heroBaseDamage[9]/5) * (1.01**(heroLvl[9])));
        hCost[9] += ((hCostBase[9]/4) * (1.06**(heroLvl[9])));
        heroLvl[9]++;
        displayStats();
        heroLvlMult(9);
        document.getElementById("hero9Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[9] && heroBought[9] == false)
    {
        heroBought[9] = true;
        gold -= hCost[9];
        hCost[9] += ((hCostBase[9]/4) * (1.06**(heroLvl[9])));
        heroLvl[9]++;
        displayStats();
        heroAtk[9] = setInterval(heroAttack9, heroAtkCooldown[9]*1000);
        console.log("hero 9 unlocked");
        document.getElementById("hero9Locked").innerHTML = "Upgrade";
    }

    
}
function heroAttack9()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[9]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero9Sprite").classList.add("attacking9");}, 0);
    setTimeout(function(){document.getElementById("hero9Sprite").classList.remove("attacking9");}, 150);
    setTimeout(dealDamage, 100);
}

// checking for hero unlocks

function heroUnlockCheck()
{
    //hero 1 unlocks
    if (stage > 0 && heroUnlocked[1] == false)
    {
        heroUnlocked[1] = true;
        document.getElementById("hero1Button").addEventListener("click", buyHero1);
        document.getElementById("hCost1").innerHTML = convrt(hCost[1]);
    }
    if (heroLvl[1] >= 10 && h1M[1] == false)
    {
        document.getElementById("hero1M1").innerHTML = "Hero Damage x 1.2";
        document.getElementById("hMCost1").innerHTML = convrt(hM1Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 10 && h1M[1] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 30)";
        document.getElementById("hMCost1").innerHTML = convrt(hM2Cost1);
    }
    if (heroLvl[1] >= 30 && h1M[2] == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM2Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
        
    }
    if (heroLvl[1] >= 30 && h1M[2] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 60)";
        document.getElementById("hMCost1").innerHTML = convrt(hM3Cost1);
    }
    if (heroLvl[1] >= 60 && h1M[3] == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Damage x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM3Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 60 && h1M[3] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 100)";
        document.getElementById("hMCost1").innerHTML = convrt(hM4Cost1);
    }
    if (heroLvl[1] >= 100 && h1M[4] == false)
    {
        document.getElementById("hero1M1").innerHTML = "Click Damage x 1.2";
        document.getElementById("hMCost1").innerHTML = convrt(hM4Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 100 && h1M[4] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 200)";
        document.getElementById("hMCost1").innerHTML = convrt(hM5Cost1);
    }
    if (heroLvl[1] >= 200 && h1M[5] == false)
    {
        document.getElementById("hero1M1").innerHTML = "Blue Hero Damage x 1.25";
        document.getElementById("hMCost1").innerHTML = convrt(hM5Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 200 && h1M[5] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 300)";
        document.getElementById("hMCost1").innerHTML = convrt(hM6Cost1);
    }
    if (heroLvl[1] >= 300 && h1M[6] == false)
    {
        document.getElementById("hero1M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM6Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 300 && h1M[6] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 400)";
        document.getElementById("hMCost1").innerHTML = convrt(hM7Cost1);
    }
    if (heroLvl[1] >= 400 && h1M[7] == false)
    {
        document.getElementById("hero1M1").innerHTML = "Hero Damage x 1.1";
        document.getElementById("hMCost1").innerHTML = convrt(hM7Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 400 && h1M[7] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 500)";
        document.getElementById("hMCost1").innerHTML = convrt(hM8Cost1);
    }
    if (heroLvl[1] >= 500 && h1M[8] == false)
    {
        document.getElementById("hero1M1").innerHTML = "Boss Gold x 1.2";
        document.getElementById("hMCost1").innerHTML = convrt(hM8Cost1);
        document.getElementById("hero1Button2").addEventListener("click", buyHero1Milestone); 
    }
    if (heroLvl[1] >= 500 && h1M[8] == true)
    {
        document.getElementById("hero1M1").innerHTML = "Milestone (Lvl. 1000)";
        document.getElementById("hMCost1").innerHTML = convrt(hM9Cost1);
    }


    //hero 2 unlocks
    if (stage > 0 && heroUnlocked[2] == false)
    {
        heroUnlocked[2] = true;
        document.getElementById("hero2Button").addEventListener("click", buyHero2);
        document.getElementById("hCost2").innerHTML = convrt(hCost[2]);
    }
    if (heroLvl[2] >= 10 && h2M[1] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Ranged Hero Damage x 1.2";
        document.getElementById("hMCost2").innerHTML = convrt(hM1Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 10 && h2M[1] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 30)";
        document.getElementById("hMCost2").innerHTML = convrt(hM2Cost2);
    }
    if (heroLvl[2] >= 30 && h2M[2] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Click Damage x 1.2";
        document.getElementById("hMCost2").innerHTML = convrt(hM2Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
        
    }
    if (heroLvl[2] >= 30 && h2M[2] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 60)";
        document.getElementById("hMCost2").innerHTML = convrt(hM3Cost2);
    }
    if (heroLvl[2] >= 60 && h2M[3] == false)
    {
        document.getElementById("hero2M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost2").innerHTML = convrt(hM3Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 60 && h2M[3] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 100)";
        document.getElementById("hMCost2").innerHTML = convrt(hM4Cost2);
    }
    if (heroLvl[2] >= 100 && h2M[4] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Orange Hero Damage x 1.25";
        document.getElementById("hMCost2").innerHTML = convrt(hM4Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 100 && h2M[4] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 200)";
        document.getElementById("hMCost2").innerHTML = convrt(hM5Cost2);
    }
    if (heroLvl[2] >= 200 && h2M[5] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Regular Enemy Gold x 1.2";
        document.getElementById("hMCost2").innerHTML = convrt(hM5Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 200 && h2M[5] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 300)";
        document.getElementById("hMCost2").innerHTML = convrt(hM6Cost2);
    }
    if (heroLvl[2] >= 300 && h2M[6] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Ranged Hero Damage x 1.1";
        document.getElementById("hMCost2").innerHTML = convrt(hM6Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 300 && h2M[6] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 400)";
        document.getElementById("hMCost2").innerHTML = convrt(hM7Cost2);
    }
    if (heroLvl[2] >= 400 && h2M[7] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Hero Damage x 1.1";
        document.getElementById("hMCost2").innerHTML = convrt(hM7Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 400 && h2M[7] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 500)";
        document.getElementById("hMCost2").innerHTML = convrt(hM8Cost2);
    }
    if (heroLvl[2] >= 500 && h2M[8] == false)
    {
        document.getElementById("hero2M1").innerHTML = "Golden Enemy Gold x 1.2";
        document.getElementById("hMCost2").innerHTML = convrt(hM8Cost2);
        document.getElementById("hero2Button2").addEventListener("click", buyhero2Milestone); 
    }
    if (heroLvl[2] >= 500 && h2M[8] == true)
    {
        document.getElementById("hero2M1").innerHTML = "Milestone (Lvl. 1000)";
        document.getElementById("hMCost2").innerHTML = convrt(hM9Cost2);
    }

    //hero 3 unlocks
    if (stage > 0 && heroUnlocked[3] == false)
    {
        heroUnlocked[3] = true;
        document.getElementById("hero3Button").addEventListener("click", buyHero3);
        document.getElementById("hCost3").innerHTML = convrt(hCost[3]);
    }
    if (heroLvl[3] >= 10 && h3M[1] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Red Hero Damage x 1.25";
        document.getElementById("hMCost3").innerHTML = convrt(hM1Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 10 && h3M[1] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 30)";
        document.getElementById("hMCost3").innerHTML = convrt(hM2Cost3);
    }
    if (heroLvl[3] >= 30 && h3M[2] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Melee Hero Damage x 1.2";
        document.getElementById("hMCost3").innerHTML = convrt(hM2Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
        
    }
    if (heroLvl[3] >= 30 && h3M[2] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 60)";
        document.getElementById("hMCost3").innerHTML = convrt(hM3Cost3);
    }
    if (heroLvl[3] >= 60 && h3M[3] == false)
    {
        document.getElementById("hero3M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM3Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 60 && h3M[3] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 100)";
        document.getElementById("hMCost3").innerHTML = convrt(hM4Cost3);
    }
    if (heroLvl[3] >= 100 && h3M[4] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Boss Gold x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM4Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 100 && h3M[4] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 200)";
        document.getElementById("hMCost3").innerHTML = convrt(hM5Cost3);
    }
    if (heroLvl[3] >= 200 && h3M[5] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Melee Hero Damage x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM5Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 200 && h3M[5] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 300)";
        document.getElementById("hMCost3").innerHTML = convrt(hM6Cost3);
    }
    if (heroLvl[3] >= 300 && h3M[6] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Crit Damage x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM6Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 300 && h3M[6] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 400)";
        document.getElementById("hMCost3").innerHTML = convrt(hM7Cost3);
    }
    if (heroLvl[3] >= 400 && h3M[7] == false)
    {
        document.getElementById("hero3M1").innerHTML = "Click Damage x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM7Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 400 && h3M[7] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 500)";
        document.getElementById("hMCost3").innerHTML = convrt(hM8Cost3);
    }
    if (heroLvl[3] >= 500 && h3M[8] == false)
    {
        document.getElementById("hero3M1").innerHTML = "All Damage x 1.1";
        document.getElementById("hMCost3").innerHTML = convrt(hM8Cost3);
        document.getElementById("hero3Button2").addEventListener("click", buyHero3Milestone); 
    }
    if (heroLvl[3] >= 500 && h3M[8] == true)
    {
        document.getElementById("hero3M1").innerHTML = "Milestone (Lvl. 1000)";
        document.getElementById("hMCost3").innerHTML = convrt(hM9Cost3);
    }

    //hero 4 unlocks
    if (stage > 0 && heroUnlocked[4] == false)
    {
        heroUnlocked[4] = true;
        document.getElementById("hero4Button").addEventListener("click", buyHero4);
        document.getElementById("hCost4").innerHTML = convrt(hCost[4]);
    }
    //hero 5 unlocks
    if (stage > 0 && heroUnlocked[5] == false)
    {
        heroUnlocked[5] = true;
        document.getElementById("hero5Button").addEventListener("click", buyHero5);
        document.getElementById("hCost5").innerHTML = convrt(hCost[5]);
    }
    //hero 6 unlocks
    if (stage > 0 && heroUnlocked[6] == false)
    {
        heroUnlocked[6] = true;
        document.getElementById("hero6Button").addEventListener("click", buyHero6);
        document.getElementById("hCost6").innerHTML = convrt(hCost[6]);
    }
    //hero 7 unlocks
    if (stage > 0 && heroUnlocked[7] == false)
    {
        heroUnlocked[7] = true;
        document.getElementById("hero7Button").addEventListener("click", buyHero7);
        document.getElementById("hCost7").innerHTML = convrt(hCost[7]);
    }
    //hero 8 unlocks
    if (stage > 0 && heroUnlocked[8] == false)
    {
        heroUnlocked[8] = true;
        document.getElementById("hero8Button").addEventListener("click", buyHero8);
        document.getElementById("hCost8").innerHTML = convrt(hCost[8]);
    }
    //hero 9 unlocks
    if (stage > 0 && heroUnlocked[9] == false)
    {
        heroUnlocked[9] = true;
        document.getElementById("hero9Button").addEventListener("click", buyHero9);
        document.getElementById("hCost9").innerHTML = convrt(hCost[9]);
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
    if (heroLvl[i] == 65)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 80)
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
    if (heroLvl[i] == 220)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 240)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 260)
    {
        hDmgMult[i] *= 2;
        heroDamage[i] *= 2;
    }
    if (heroLvl[i] == 280)
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
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 460)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 500)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 530)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 560)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 600)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
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
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
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
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 830)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 860)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 900)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 930)
    {
        hDmgMult[i] *= 3;
        heroDamage[i] *= 3;
    }
    if (heroLvl[i] == 960)
    {
        hDmgMult[i] *= 4;
        heroDamage[i] *= 4;
    }
    if (heroLvl[i] == 1000)
    {
        hDmgMult[i] *= 1000;
        heroDamage[i] *= 1000;
    }
    if (heroLvl[i] == 1050)
    {
        hDmgMult[i] *= 8;
        heroDamage[i] *= 8;
    }
    if (heroLvl[i] == 1100)
    {
        hDmgMult[i] *= 9;
        heroDamage[i] *= 9;
    }
}


// click upgrades

function upgrade()
{
    if (gold >= clickUpCost)
    {
        gold -= clickUpCost;
        damage += (allDamageMult * clickDamageMult * 1 * (1.01**(clickLevel - 1)));
        clickUpCost += (5 * (1.05**(clickLevel - 1)));
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
        if (clickLevel == 120)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 140)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 160)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 180)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 200)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
        if (clickLevel == 220)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 240)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 260)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 280)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 300)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
        if (clickLevel == 325)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 350)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 375)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 400)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
        if (clickLevel == 425)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 450)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 475)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 500)
        {
            damage *= 5;
            clickDamageMult *= 5;
        }
        if (clickLevel == 530)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 560)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 590)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 620)
        {
            damage *= 5;
            clickDamageMult *= 5;
        }
        if (clickLevel == 650)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 680)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 710)
        {
            damage *= 5;
            clickDamageMult *= 5;
        }
        if (clickLevel == 740)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 770)
        {
            damage *= 2;
            clickDamageMult *= 2;
        }
        if (clickLevel == 800)
        {
            damage *= 5;
            clickDamageMult *= 5;
        }
        if (clickLevel == 850)
        {
            damage *= 3;
            clickDamageMult *= 3;
        }
        if (clickLevel == 900)
        {
            damage *= 4;
            clickDamageMult *= 4;
        }
        if (clickLevel == 950)
        {
            damage *= 3;
            clickDamageMult *= 3;
        }
        if (clickLevel == 1000)
        {
            damage *= 10;
            clickDamageMult *= 10;
        }
    }
}
//hero multiplier function
function allDamageMultiplier(i)
{
    allDamageMult *= i;
    for (j = 1; j < heroDamage.length; j++)
        {
            heroDamage[j] *= i;
        }
    damage *= i;
}
function heroDamageMultiplier(i)
{
    for (j = 1; j < heroDamage.length; j++)
        {
            heroDamage[j] *= i;
        }
    heroDamageMult = heroDamageMult * i;
}
function rangedHeroMultiplier(i)
{
    rangedHeroDmg *= i;
    heroDamage[2] *= i;
    heroDamage[4] *= i;
    heroDamage[7] *= i;
    heroDamage[8] *= i;
}
function meleeHeroMultiplier(i)
{
    meleeHeroDmg *= i;
    heroDamage[1] *= i;
    heroDamage[3] *= i;
    heroDamage[5] *= i;
    heroDamage[6] *= i;
    heroDamage[9] *= i;
}
function heroBlueMultiplier(i)
{
    heroColorDmg[2] *= i;
    heroDamage[1] *= i;
}
function heroOrangeMultiplier(i)
{
    heroColorDmg[4] *= i;
    heroDamage[2] *= i;
    heroDamage[7] *= i;
}
function heroRedMultiplier(i)
{
    heroColorDmg[1] *= i;
    heroDamage[3] *= i;
    heroDamage[9] *= i;
}
function heroPurpleMultiplier(i)
{
    heroColorDmg[5] *= i;
    heroDamage[4] *= i;
    heroDamage[8] *= i;
}
function heroGreenMultiplier(i)
{
    heroColorDmg[6] *= i;
    heroDamage[5] *= i;
}
function heroYellowMultiplier(i)
{
    heroColorDmg[3] *= i;
    heroDamage[6] *= i;
}

//milestone cost
function milestoneCost(i, j)
{
    return ((hCostBase[i]) * 1.06**(j)) * 20;
}

// abilities
var abilityBought = [false, false];
var abilityActive = [false, false];

var aCooldownBase = [0, 90];
var aCooldown = [0, 0];
var aDurationBase = [0, 30];
var aDuration = [0, 0];


function buyAbility1()
{
    if (gold >= aCost[1] && abilityBought[1] == true && abilityActive[1] == false && aLvl[1] < 30)
    {
        gold -= aCost[1];
        aCost[1] += ((aCostBase[1]*2)**(aLvl[1]) * 10**(aLvl[1]));
        aCooldownBase[1] += 5;
        shapeRageMult *= 1.25;
        aLvl[1]++;
        document.getElementById("ability1Locked").innerHTML = 'Upgrade';
    }
    if (gold >= aCost[1] && abilityBought[1] == false && stage >= 10)
    {
        gold -= aCost[1];
        abilityBought[1] = true;
        aCost[1] += ((aCostBase[1]*2) * 10**(aLvl[1]));
        aLvl[1]++;
        document.getElementById("ability1Locked").innerHTML = 'Upgrade';
        document.getElementById("ability1Button").addEventListener("click", useAbility1)
        console.log('Shape Rage Unlocked');
    }

}


function useAbility1()
{
    if (aCooldown[1] == 0)
    {
        abilityActive[1] = true;
        console.log("shape rage activated");
        aCooldown[1] = aCooldownBase[1];
        aDuration[1] = aDurationBase[1];
        heroDamageMult *= shapeRageMult; 
        for (i = 1; i <= heroNumber.length; i++)
        {
            heroDamage[i] *= shapeRageMult;
            clearInterval(heroAtk[i]);
        }
        if (heroBought[1] == true)
        {
            heroAtk[1] = setInterval(heroAttack1, heroAtkCooldown[1]*500);
        }
        if (heroBought[2] == true)
        {
            heroAtk[2] = setInterval(heroAttack2, heroAtkCooldown[2]*500);
        }
        if (heroBought[3] == true)
        {
            heroAtk[3] = setInterval(heroAttack3, heroAtkCooldown[3]*500);
        }
        if (heroBought[4] == true)
        {
            heroAtk[4] = setInterval(heroAttack4, heroAtkCooldown[4]*500);
        }
        if (heroBought[5] == true)
        {
            heroAtk[5] = setInterval(heroAttack5, heroAtkCooldown[5]*500); 
        }
        if (heroBought[6] == true)
        {
            heroAtk[6] = setInterval(heroAttack6, heroAtkCooldown[6]*500);
        }
        if (heroBought[7] == true)
        {
            heroAtk[7] = setInterval(heroAttack7, heroAtkCooldown[7]*500);
        }
        if (heroBought[8] == true)
        {
            heroAtk[8] = setInterval(heroAttack8, heroAtkCooldown[8]*500);
        }
        if (heroBought[9] == true)
        {
            heroAtk[9] = setInterval(heroAttack9, heroAtkCooldown[9]*500);
        }
        
        var cooldown = setInterval(function(){
            aCooldown[1] -= 1;
            if (aCooldown[1] <= 0)
            {
                aCooldown[1] = 0;
                clearInterval(cooldown);
                console.log("shape rage ready");
            }
        }, 1000);

        var duration = setInterval(function(){
            aDuration[1] -= 1;

            if (aDuration[1] <= 0)
            {
                aDuration[1] = 0;
                abilityActive[1] = false;
                clearInterval(duration);
                heroDamageMult /= shapeRageMult; 
                for (i = 1; i <= heroNumber.length; i++)
                {
                    heroDamage[i] /= shapeRageMult;
                    clearInterval(heroAtk[i]);
                }
                if (heroBought[1] == true)
                {
                    heroAtk[1] = setInterval(heroAttack1, heroAtkCooldown[1]*1000);
                }
                if (heroBought[2] == true)
                {
                    heroAtk[2] = setInterval(heroAttack2, heroAtkCooldown[2]*1000);
                }
                if (heroBought[3] == true)
                {
                    heroAtk[3] = setInterval(heroAttack3, heroAtkCooldown[3]*1000);
                }
                if (heroBought[4] == true)
                {
                    heroAtk[4] = setInterval(heroAttack4, heroAtkCooldown[4]*1000);
                }
                if (heroBought[5] == true)
                {
                    heroAtk[5] = setInterval(heroAttack5, heroAtkCooldown[5]*1000); 
                }
                if (heroBought[6] == true)
                {
                    heroAtk[6] = setInterval(heroAttack6, heroAtkCooldown[6]*1000);
                }
                if (heroBought[7] == true)
                {
                    heroAtk[7] = setInterval(heroAttack7, heroAtkCooldown[7]*1000);
                }
                if (heroBought[8] == true)
                {
                    heroAtk[8] = setInterval(heroAttack8, heroAtkCooldown[8]*1000);
                }
                if (heroBought[9] == true)
                {
                    heroAtk[9] = setInterval(heroAttack9, heroAtkCooldown[9]*1000);
                }
                console.log("shape rage ended");
            }
        }, 1000);
    }
}



//stat displaying

document.getElementById("enemyHealth").innerHTML = convrt(health);
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

document.getElementById("hMCost1").innerHTML = convrt(hM1Cost1);
document.getElementById("hMCost2").innerHTML = convrt(hM1Cost2);
document.getElementById("hMCost3").innerHTML = convrt(hM1Cost3);


document.getElementById("aCost1").innerHTML = 'Stage 10';

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
        document.getElementById("hCost7").innerHTML = convrt(hCost[7]);
        document.getElementById("hCost8").innerHTML = convrt(hCost[8]);
        document.getElementById("hCost9").innerHTML = convrt(hCost[9]);
    }
    if (stage >= 10)
    {
        document.getElementById("aCost1").innerHTML = convrt(aCost[1]);
        if (aLvl[1] >= 30)
        {
            document.getElementById("aCost1").innerHTML = "MAX";
        }
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

    document.getElementById("hero7Lvl").innerHTML = heroLvl[7];
    document.getElementById("hero7Damage").innerHTML = convrt(heroDamage[7]);

    document.getElementById("hero8Lvl").innerHTML = heroLvl[8];
    document.getElementById("hero8Damage").innerHTML = convrt(heroDamage[8]);

    document.getElementById("hero9Lvl").innerHTML = heroLvl[9];
    document.getElementById("hero9Damage").innerHTML = convrt(heroDamage[9]);

    /* Ability Stuff */
    document.getElementById("aLvl1").innerHTML = aLvl[1];
    document.getElementById("shapeRageMult").innerHTML = convrt(shapeRageMult);
    document.getElementById("aCooldown1").innerHTML = convrt(aCooldown[1]);
    document.getElementById("aDuration1").innerHTML = convrt(aDuration[1]);
    document.getElementById("aCooldownBase1").innerHTML = convrt(aCooldownBase[1]);
    document.getElementById("aDurationBase1").innerHTML = convrt(aDurationBase[1]);

    /* Health Bar Stuff */
    document.getElementById("healthStat").style.backgroundSize = ((health/maxHealth) * 100)+"% 100%";
}

function multiUpgrade()
{
    var h = prompt("Which Hero would you like to upgrade? (Type in their number value.  Type 0 for upgrading click)");
    var t = prompt("How many times would you like to upgrade them?");
    if (h == 0)
    {
        for (i = 0; i < t; i++)
        {
            upgrade();
        }
    }
    if (h == 1 && heroBought[1] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero1();
        }
    }
    if (h == 2 && heroBought[2] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero2();
        }
    }
    if (h == 3 && heroBought[3] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero3();
        }
    }
    if (h == 4 && heroBought[4] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero4();
        }
    }
    if (h == 5 && heroBought[5] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero5();
        }
    }
    if (h == 6 && heroBought[6] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero6();
        }
    }
    if (h == 7 && heroBought[7] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero7();
        }
    }
    if (h == 8 && heroBought[8] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero8();
        }
    }
    if (h == 9 && heroBought[9] == true)
    {
        for (i = 0; i < t; i++)
        {
            buyHero9();
        }
    }
}

document.getElementById("multInfoButton").addEventListener("click", showMultInfo);
function showMultInfo()
{
    document.getElementById("multInfoButton").innerHTML = "Hide Levelling Info";
    document.getElementById("multiplierInfo").style.display = "block";
    document.getElementById("multInfoButton").removeEventListener("click", showMultInfo);
    document.getElementById("multInfoButton").addEventListener("click", hideMultInfo);
}
function hideMultInfo()
{
    document.getElementById("multInfoButton").innerHTML = "Show Levelling Info";
    document.getElementById("multiplierInfo").style.display = "none";
    document.getElementById("multInfoButton").addEventListener("click", showMultInfo);
    document.getElementById("multInfoButton").removeEventListener("click", hideMultInfo);
}

function milestoneLoad()
{
    if (h1M[1] == true)
    {

    }
}

/* GAME SAVING ---------------------------------------------------------------------- */
/* ---------------------------------------faust-------------------------------------- */
function reloadFunction()
{
    return "Are you sure you want to leave the site?  Make sure you have saved your progress.";
}
function setPassword()
{
    var passwordSet = prompt("Would you like a password for saving? (type 'yes' or 'no') ");
    if (passwordSet != 'yes')
    {
        passwordSet = 'no';
        passSet = false;
    }
    if (passwordSet == 'yes')
    {
        savePass = prompt("What is your password?");
        passSet = true;
    }
}

function saveGame()
{
    if (passSet == true)
    {
        var pass = prompt("What is the password?")
        if (pass == savePass)
        {
            for (i = 1; i < aLvl.length; i++)
            {
                abilityActive[i] = false;
                aDuration[i] = 0;
            }
            document.getElementById("ability1Button").removeEventListener("click", useAbility1);
            setTimeout(function(){document.getElementById("ability1Button").addEventListener("click", useAbility1)}, 1200);
            setTimeout(saveGameDefer, 1000);
            setTimeout(function(){document.getElementById("save").style.backgroundColor = "green"}, 1000);
            setTimeout(function(){document.getElementById("save").style.backgroundColor = "rgb(214, 214, 214)"}, 1200);
        }
    }
    if (passSet == false)
    {
        for (i = 1; i < aLvl.length; i++)
        {
            abilityActive[i] = false;
            aDuration[i] = 0;
        }
        document.getElementById("ability1Button").removeEventListener("click", useAbility1);
        setTimeout(function(){document.getElementById("ability1Button").addEventListener("click", useAbility1)}, 1200);
        setTimeout(saveGameDefer, 1000);
        setTimeout(function(){document.getElementById("save").style.backgroundColor = "green"}, 1000);
        setTimeout(function(){document.getElementById("save").style.backgroundColor = "rgb(214, 214, 214)"}, 1200);
    }
    
}
function saveGameDefer()
{
    console.log("game saved");
    localStorage.setItem('stage', JSON.stringify(stage));
    localStorage.setItem('health', JSON.stringify(health));
    localStorage.setItem('maxHealth', JSON.stringify(maxHealth));
    localStorage.setItem('boss', JSON.stringify(boss));
    localStorage.setItem('gold', JSON.stringify(gold));
    localStorage.setItem('stageProgress', JSON.stringify(stageProgress));
    localStorage.setItem('heroDamage', JSON.stringify(heroDamage));
    localStorage.setItem('heroBaseDamage', JSON.stringify(heroBaseDamage));
    localStorage.setItem('heroLvl', JSON.stringify(heroLvl));

    localStorage.setItem('damage', JSON.stringify(damage));
    localStorage.setItem('clickDamageMult', JSON.stringify(clickDamageMult));
    localStorage.setItem('clickCritMult', JSON.stringify(clickCritMult));
    localStorage.setItem('clickCritChance', JSON.stringify(clickCritChance));
    localStorage.setItem('clickLevel', JSON.stringify(clickLevel));
    localStorage.setItem('clickUpCost', JSON.stringify(clickUpCost));

    localStorage.setItem('heroUnlocked', JSON.stringify(heroUnlocked));
    localStorage.setItem('heroBought', JSON.stringify(heroBought));
    localStorage.setItem('hCost', JSON.stringify(hCost));
    localStorage.setItem('hCostBase', JSON.stringify(hCostBase));

    localStorage.setItem('heroAtk', JSON.stringify(heroAtk));
    localStorage.setItem('hDmgMult', JSON.stringify(hDmgMult));
    localStorage.setItem('heroDamageMult', JSON.stringify(heroDamageMult));

    localStorage.setItem('allGoldMult', JSON.stringify(allGoldMult));
    localStorage.setItem('bossGoldMult', JSON.stringify(bossGoldMult));
    localStorage.setItem('regGoldMult', JSON.stringify(regGoldMult));
    localStorage.setItem('goldenGoldMult', JSON.stringify(goldenGoldMult));

    localStorage.setItem('isGolden', JSON.stringify(isGolden));
    localStorage.setItem('isReg', JSON.stringify(isReg));

    localStorage.setItem('aDurationBase', JSON.stringify(aDurationBase));
    localStorage.setItem('aDuration', JSON.stringify(aDuration));
    localStorage.setItem('aCooldownBase', JSON.stringify(aCooldownBase));
    localStorage.setItem('aCooldown', JSON.stringify(aCooldown));
    localStorage.setItem('abilityBought', JSON.stringify(abilityBought));
    localStorage.setItem('abilityActive', JSON.stringify(abilityActive));
    localStorage.setItem('aCostBase', JSON.stringify(aCostBase));
    localStorage.setItem('aCost', JSON.stringify(aCost));
    localStorage.setItem('aLvl', JSON.stringify(aLvl));
    localStorage.setItem('shapeRageMult', JSON.stringify(shapeRageMult));
    localStorage.setItem('h1M', JSON.stringify(h1M));
    localStorage.setItem('h2M', JSON.stringify(h2M));
    localStorage.setItem('h3M', JSON.stringify(h3M));

    localStorage.setItem('savePass', JSON.stringify(savePass));
    localStorage.setItem('passSet', JSON.stringify(passSet));
}
function loadGame()
{
    if (gameLoaded == false)
    {
        console.log("save loaded");
        gameLoaded = true;
        stage = JSON.parse(localStorage.getItem('stage'));
        health = JSON.parse(localStorage.getItem('health'));
        maxHealth = JSON.parse(localStorage.getItem('maxHealth'));
        boss = JSON.parse(localStorage.getItem('boss'));
        gold = JSON.parse(localStorage.getItem('gold'));
        stageProgress = JSON.parse(localStorage.getItem('stageProgress'));

        heroDamage = JSON.parse(localStorage.getItem('heroDamage'));
        heroBaseDamage = JSON.parse(localStorage.getItem('heroBaseDamage'));
        heroLvl = JSON.parse(localStorage.getItem('heroLvl'));

        damage = JSON.parse(localStorage.getItem('damage'));
        clickDamageMult = JSON.parse(localStorage.getItem('clickDamageMult'));
        clickCritMult = JSON.parse(localStorage.getItem('clickCritMult'));
        clickCritChance = JSON.parse(localStorage.getItem('clickCritChance'));
        clickLevel = JSON.parse(localStorage.getItem('clickLevel'));
        clickUpCost = JSON.parse(localStorage.getItem('clickUpCost'));

        heroUnlocked = JSON.parse(localStorage.getItem('heroUnlocked'));
        heroBought = JSON.parse(localStorage.getItem('heroBought'));
        hCostBase = JSON.parse(localStorage.getItem('hCostBase'));
        hCost = JSON.parse(localStorage.getItem('hCost'));
        
        heroAtk = JSON.parse(localStorage.getItem('heroAtk'));
        hDmgMult = JSON.parse(localStorage.getItem('hDmgMult'));
        heroDamageMult = JSON.parse(localStorage.getItem('heroDamageMult'));

        allGoldMult = JSON.parse(localStorage.getItem('allGoldMult'));
        bossGoldMult = JSON.parse(localStorage.getItem('bossGoldMult'));
        regGoldMult = JSON.parse(localStorage.getItem('regGoldMult'));
        goldenGoldMult = JSON.parse(localStorage.getItem('goldenGoldMult'));

        isGolden = JSON.parse(localStorage.getItem('isGolden'));
        isReg = JSON.parse(localStorage.getItem('isReg'));

        aDurationBase = JSON.parse(localStorage.getItem('aDurationBase'));
        aDuration = JSON.parse(localStorage.getItem('aDuration'));
        aCooldownBase = JSON.parse(localStorage.getItem('aCooldownBase'));
        aCooldown = JSON.parse(localStorage.getItem('aCooldown'));
        abilityBought = JSON.parse(localStorage.getItem('abilityBought'));
        abilityActive = JSON.parse(localStorage.getItem('abilityActive'));
        aCostBase = JSON.parse(localStorage.getItem('aCostBase'));
        aCost = JSON.parse(localStorage.getItem('aCost'));
        aLvl = JSON.parse(localStorage.getItem('aLvl'));
        shapeRageMult = JSON.parse(localStorage.getItem('shapeRageMult'));

        h1M = JSON.parse(localStorage.getItem('h1M'));
        h2M = JSON.parse(localStorage.getItem('h2M'));
        h3M = JSON.parse(localStorage.getItem('h3M'));

        savePass = JSON.parse(localStorage.getItem('savePass'));
        passSet = JSON.parse(localStorage.getItem('passSet'));
        
        //milestone stuff
        heroUnlockCheck();

        // ability stuff
        if (abilityBought[1] == true)
        {
            document.getElementById("ability1Button").addEventListener("click", useAbility1);
            document.getElementById("ability1Locked").innerHTML = "Upgrade";
            var cooldown = setInterval(function(){
                aCooldown[1] -= 1;
                if (aCooldown[1] <= 0)
                {
                    aCooldown[1] = 0;
                    clearInterval(cooldown);
                    console.log("shape rage ready");
                }
            }, 1000);
        }
        

        // making heroes attack
        if (heroBought[1] == true)
        {
            clearInterval(heroAtk[1]);
            heroAtk[1] = setInterval(heroAttack1, heroAtkCooldown[1]*1000);
            document.getElementById("hero1Locked").innerHTML = "Upgrade";
        }
        if (heroBought[2] == true)
        {
            clearInterval(heroAtk[2]);
            heroAtk[2] = setInterval(heroAttack2, heroAtkCooldown[2]*1000);
            document.getElementById("hero2Locked").innerHTML = "Upgrade";
        }
        if (heroBought[3] == true)
        {
            clearInterval(heroAtk[3]);
            heroAtk[3] = setInterval(heroAttack3, heroAtkCooldown[3]*1000);
            document.getElementById("hero3Locked").innerHTML = "Upgrade";
        }
        if (heroBought[4] == true)
        {
            clearInterval(heroAtk[4]);
            heroAtk[4] = setInterval(heroAttack4, heroAtkCooldown[4]*1000);
            document.getElementById("hero4Locked").innerHTML = "Upgrade";
        }
        if (heroBought[5] == true)
        {
            clearInterval(heroAtk[5]);
            heroAtk[5] = setInterval(heroAttack5, heroAtkCooldown[5]*1000);
            document.getElementById("hero5Locked").innerHTML = "Upgrade";
        }
        if (heroBought[6] == true)
        {
            clearInterval(heroAtk[6]);
            heroAtk[6] = setInterval(heroAttack6, heroAtkCooldown[6]*1000);
            document.getElementById("hero6Locked").innerHTML = "Upgrade";
        }
        if (heroBought[7] == true)
        {
            clearInterval(heroAtk[7]);
            heroAtk[7] = setInterval(heroAttack7, heroAtkCooldown[7]*1000);
            document.getElementById("hero7Locked").innerHTML = "Upgrade";
        }
        if (heroBought[8] == true)
        {
            clearInterval(heroAtk[8]);
            heroAtk[8] = setInterval(heroAttack8, heroAtkCooldown[8]*1000);
            document.getElementById("hero8Locked").innerHTML = "Upgrade";
        }
        if (heroBought[9] == true)
        {
            clearInterval(heroAtk[9]);
            heroAtk[9] = setInterval(heroAttack9, heroAtkCooldown[9]*1000);
            document.getElementById("hero9Locked").innerHTML = "Upgrade";
        }
    }
    
}

/* -------------------------------------------- */
// admin

function goldSpawn()
{
    let adminCode = prompt("Admin Passcode");
    if (adminCode == hacks)
    {
        let goldAmount1 = prompt("Base value of gold [(x) * 10 ** y]");
        let goldAmount2 = prompt("Amount of zeroes in gold value [x * 10 ** (y)]");
        parseInt(goldAmount1);
        parseInt(goldAmount2);
        gold = goldAmount1 * 10 ** goldAmount2
    }
    else 
    {
        alert("Nope Denied");
    }
    
}
function stageSelect()
{
    let adminCode = prompt("Admin Passcode")
    if (adminCode == hacks)
    {
        let stageSelect = prompt("Which stage do you want to go to?");
        stage = parseInt(stageSelect);
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9)).toFixed(2);
        maxHealth = health;
        stageProgress = 1;
    }
    else 
    {
        alert("Nope Denied");
    }
    
}

var faust = setInterval(displayStats, 1);


