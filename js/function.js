const gameRunning = true;
var gameLoaded = false; 
var health = 100;   //enemy health
var clickDamageMult = [0, 1, 1];    //click damage multiplier
var clickCritMult = 3;          // critical damage multiplier
var clickCritChance = 2;        //critical chance (only for clicking)
var heroDamageMult = 1;     //all hero damage multiplier
var allGoldMult = 1;        //all gold multiplier
var allDamageMult = 1;      //these varaibles are almost self expalnatory
var bossGoldMult = 1;
var regGoldMult = 1;
var goldenGoldMult = 1; // golden enemy gold multiplier
var heroClickMult = 0;  // click damage from heroes DPS multiplier (i.e. 1% damage from total hero DPS is equal to 0.01)

var isGolden = false;   // these booleans check certain states or versions of enemies/bosses
var isReg = true;
var enemyDead = false;
var bossChallenged = false;

// setting up variables for player and hero statistics
var damage = [0, 5e0, 5e0];
var heroLvl = [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var hDmgMult = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var heroNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// update comparing variable
var heroNumberU = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// hero attack array (intervals get added to this array as you get heroes)
var heroAtk = [0, 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler'];

var hCostBase = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13, 1.75e15, 4.00e17, 1.10e20];
var hCost = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13, 1.75e15, 4.00e17, 1.10e20];
var heroAtkCooldown = [0, 2, 0.5, 5, 1.75, 2.5, 1.5, 6, 1.25, 1, 3, 4, 2.25];
var heroUnlocked = [true, false, false, false, false, false, false, false, false, false, false, false, false];
var heroBought = [true, false, false, false, false, false, false, false, false, false, false, false, false];
var heroBaseDamage = [0];
var heroDamage = [0];

// red, blue, yellow, orange, purple, green (damage multipliers for heroes of a certain color)
var heroColorDmg = [0, 1, 1, 1, 1, 1, 1];
var rangedHeroDmg = 1;      // ranged hero multiplier (heroes that visibly shoot something)
var meleeHeroDmg = 1;       // melee hero multiplier (heroes that visibly attack with melee)
 //equations sets up damage for heroes based on their cost and attack speed
for (let i = 1; i < hCost.length; i++) 
{
    let z = 1;
    z = (hCost[i] * 5 * z * heroAtkCooldown[i]) / 4 * ((1-23/1000*min(heroNumber[i], heroNumber.length))**min(heroNumber[i],heroNumber.length));
    heroDamage.push(z);
    heroBaseDamage.push(z);
}
var allHeroDmg = 0;     //total hero damage added up
var aCostBase = [0, 1e3];   //ability stats (cooldowns, costs, damage multiplier, etc.)
var aCost = [0, 1e3];
var aLvl = [0, 0];
var shapeRageMult = 1.5;

var stage = 1;
var stageProgress = 1;
var boss = false;   //variable checks if the current stage is at a boss or not
var gold = 0;
var clickUpCost = 5;
var clickUpCost2 = 5;

var clickLevel = [0, 1, 1];

var trueDamage = damage[1] + (allHeroDmg * heroClickMult);  //true damage is the damage of your click PLUS the all hero damage (damage and all hero damage needs to be separate)
var trueDamage2 = damage[2] + (allHeroDmg * heroClickMult);

var maxHealth = health;

// prestige options
var prestiges = 0;
var artAmount = 0;
var artUnlockCost = Math.floor((artAmount + 1) * 1.35**(artAmount + 1));

//prestige currency
var shapestone = 0;
var shapestoneMult = 1;

var passSet = false;
var savePass;
//prestige variables
var allDamageMultP = 1;
var allGoldMultP = 1;
var heroDamageMultP = 1;
// the prestige function is given some time before running with this 'defer' function (so that glitches don't happen with active abilities and such)
function prestigeDefer()
{
    if (stage >= 80)
    {
        for (i = 1; i < aLvl.length; i++)
        {
            abilityActive[i] = false;
            aDuration[i] = 0;
        }
        document.getElementById("ability1Button").removeEventListener("click", useAbility1);
        setTimeout(prestige, 1300);
    }
}
// this function resets the players current stats but in turn gives a permanent currency that can get permanent upgrades that WON'T reset from more prestiges
function prestige()
{
    if (stage >= 80)
    {
        console.log("Prestige Successful")
        shapestone += Math.ceil((shapestoneMult * (stage - 69) / 14)**1.75);
        console.log("Shapetones earned: "+shapestone);
        prestiges++;
        // resetting variables
        stage = 1;
        stageProgress = 1;
        maxHealth = 100;
        health = maxHealth;
        clickDamageMult = [0, 1, 1];
        clickCritMult = 3;
        clickCritChance = 2;
        heroDamageMult = 1;
        allGoldMult = 1;
        allDamageMult = 1;
        bossGoldMult = 1;
        regGoldMult = 1;
        goldenGoldMult = 1;
        heroClickMult = 0;

        isGolden = false;
        isReg = true;
        enemyDead = false;
        bossChallenged = false;


        damage = [0, 5e0, 5e0];
        //heroDamage = [0, 10, 40, 4000, 17500, 250000];
        heroLvl = [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        hDmgMult = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        heroNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // array for determining hero damage used for damage percent to click damage
        indHeroDmg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // update comparing variable
        heroNumberU = heroNumber;

        hCostBase = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13, 1.75e15, 4.00e17, 1.10e20];
        hCost = [0, 2e1, 3e2, 3.5e3, 5e4, 7.5e5, 2.5e7, 1.25e9, 1e11, 1.15e13, 1.75e15, 4.00e17, 1.10e20];
        heroAtkCooldown = [0, 2, 0.5, 5, 1.75, 2.5, 1.5, 6, 1.25, 1, 3, 4, 2.25];
        heroUnlocked = [true, false, false, false, false, false, false, false, false, false, false, false, false];
        heroBought = [true, false, false, false, false, false, false, false, false, false, false, false, false];
        heroBaseDamage = [0];
        heroDamage = [0];

        heroColorDmg = [0, 1, 1, 1, 1, 1, 1];
        rangedHeroDmg = 1;
        meleeHeroDmg = 1;
        // red, blue, yellow, orange, purple, green
        for (let i = 1; i < hCost.length; i++)
        {
            let z = 1;
            z = (hCost[i] * 5 * z * heroAtkCooldown[i]) / 4 * ((1-23/1000*min(heroNumber[i], heroNumber.length))**min(heroNumber[i],heroNumber.length));
            heroDamage.push(z);
            heroBaseDamage.push(z);
        }
        allHeroDmg = 0;
        aCostBase = [0, 1e3];
        aCost = [0, 1e3];
        aLvl = [0, 0];
        shapeRageMult = 1.5;
        abilityBought = [false, false];
        abilityActive = [false, false];
        aCooldownBase = [0, 90];
        aCooldown = [0, 0];
        aDurationBase = [0, 30];
        aDuration = [0, 0];

        // resetting ability properly


        boss = false;  
        gold = 0;
        clickUpCost = 5;
        clickUpCost2 = 5;

        clickLevel = [0, 1, 1];

        trueDamage = damage[1] + (allHeroDmg * heroClickMult);
        trueDamage2 = damage[2] + (allHeroDmg * heroClickMult);

        //resetting milestones
        h1M = [true, false, false, false, false, false, false, false, false, false];
        h2M = [true, false, false, false, false, false, false, false, false, false];
        h3M = [true, false, false, false, false, false, false, false, false, false];
        h4M = [true, false, false, false, false, false, false, false, false, false];

        document.getElementById("hMCost1").innerHTML = convrt(hM1Cost1);
        document.getElementById("hMCost2").innerHTML = convrt(hM1Cost2);
        document.getElementById("hMCost3").innerHTML = convrt(hM1Cost3);
        document.getElementById("hMCost4").innerHTML = convrt(hM1Cost4);
        //
        //resetting hero attacks (so they don't attack after prestiging)
        for (let i = 1; i <= heroAtk.length; i++)
        {
            clearInterval(heroAtk[i]);
            console.log("hero attacks removed");
        }
        heroAtk = [0, 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler', 'filler'];

        document.getElementById("enemy").classList.remove("boss");  //making sure boss styles don't apply on reset

        damageSet();

        if (stage < 10){    //making sure ability and hero upgrades are reset back to their original text before unlock
            document.getElementById("aCost1").innerHTML = 'Stage 10';
        }
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
        document.getElementById("hero2Locked").innerHTML = "Upgrade";
        document.getElementById("hero3Locked").innerHTML = "Upgrade";
        document.getElementById("hero4Locked").innerHTML = "Upgrade";
        document.getElementById("hero5Locked").innerHTML = "Upgrade";
        document.getElementById("hero6Locked").innerHTML = "Upgrade";
        document.getElementById("hero7Locked").innerHTML = "Upgrade";
        document.getElementById("hero8Locked").innerHTML = "Upgrade";
        document.getElementById("hero9Locked").innerHTML = "Upgrade";
        document.getElementById("hero10Locked").innerHTML = "Upgrade";
        document.getElementById("hero11Locked").innerHTML = "Upgrade";
        document.getElementById("hero12Locked").innerHTML = "Upgrade";
    }
}

function loadPass() //loads password that's saved locally
{
    savePass = JSON.parse(localStorage.getItem('savePass'));
    passSet = JSON.parse(localStorage.getItem('passSet'));
}

// adding event listeners for clicking
document.getElementById("enemyArea").addEventListener('click', clickDamage);
document.addEventListener('keyup', clickDamage2);

document.getElementById("ability1").addEventListener('click', buyAbility1);

// number abbreviations array for conversion
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
// converts numbers to string that are compressed and easy to look at (abbreviations)
const convrt = n => { 
    if (n < 1e3 && n > 0) return +(n / 1e0).toPrecision(3); 
    if (n <= 0) return 0;
    for (var i = 1; i < abbr.length; i++)
    {
        if (n >= (10**(i*3)) && n < (10**((i*3)+3))) return +(n / (10**((i*3)))).toPrecision(3) + abbr[i];
    }
}
// the Player 1 click attack
function clickDamage()
{
    if (enemyDead == false)
    {
        enemyDamageVisual(); 
        //checking if the attack is  critical hit and applying proper styles
        if ((Math.ceil(Math.random(1) * 1000/clickCritChance)) <= 10)
        {
            health = (health - (trueDamage * clickCritMultP)); //critical hit multiplier is applied to TRUE damage (making it effective late game from hero DPS multipliers)
            console.log('critical hit!');
            document.getElementById("character").classList.remove("clickNotAttack");
            document.getElementById("character").classList.add("clickAttack");
            document.getElementById("character").classList.add("clickCrit");
            setTimeout(function(){
                document.getElementById("character").classList.remove("clickAttack");
                document.getElementById("character").classList.remove("clickCrit");
                document.getElementById("character").classList.add("clickNotAttack");
            }, 50)
        }
        else    //noncrit attack
        {
            health = (health - trueDamage);
            document.getElementById("character").classList.remove("clickNotAttack");
            document.getElementById("character").classList.add("clickAttack");
            setTimeout(function(){
                document.getElementById("character").classList.remove("clickAttack");
                document.getElementById("character").classList.remove("clickCrit");
                document.getElementById("character").classList.add("clickNotAttack");
            }, 50)
        }
        
    }
    if (health <= 0)
    {
        health = 0;
    }
    dealDamage();
}
// player 2 click attack (uses E and R to attack)
function clickDamage2(event)
{
    if (event.isComposing || event.keyCode === 69 || event.keyCode === 82)
    {
        enemyDamageVisual();
        if (enemyDead == false) //same function as player 1
        {
            if ((Math.ceil(Math.random(1) * 1000/clickCritChance)) <= 10)
            {
                health = (health - (trueDamage2 * clickCritMult));
                console.log('critical hit!');
                document.getElementById("character2").classList.remove("clickNotAttack2");
                document.getElementById("character2").classList.add("clickAttack2");
                document.getElementById("character2").classList.add("clickCrit2");
                setTimeout(function(){
                    document.getElementById("character2").classList.remove("clickAttack2");
                    document.getElementById("character2").classList.remove("clickCrit2");
                    document.getElementById("character2").classList.add("clickNotAttack2");
                }, 50)
            }
            else
            {
                health = (health - trueDamage2);
                document.getElementById("character2").classList.remove("clickNotAttack2");
                document.getElementById("character2").classList.add("clickAttack2");
                setTimeout(function(){
                    document.getElementById("character2").classList.remove("clickAttack2");
                    document.getElementById("character2").classList.remove("clickCrit2");
                    document.getElementById("character2").classList.add("clickNotAttack2");
                }, 50)
            }
            
        }
        if (health <= 0)
        {
            health = 0;
        }
        dealDamage();
    }
    
}
// visuals for enemy taking damage from clicks
function enemyDamageVisual()
{
    if (enemyHexagon != true)
    {
        if (boss == true){
            document.getElementById("enemy").classList.add("bossDamaged");
            setTimeout(function(){
                document.getElementById("enemy").classList.remove("damaged");
                document.getElementById("enemy").classList.remove("bossDamaged");
            }, 60);
        }
        else{
            document.getElementById("enemy").classList.add("damaged");
            setTimeout(function(){
                document.getElementById("enemy").classList.remove("damaged");
                document.getElementById("enemy").classList.remove("bossDamaged");
            }, 60);
        } 
    }
    if (enemyHexagon == true)   //hexagon enemies have before and after styles so need to be separated
    {
        if (boss == true){
            document.getElementById("enemy").classList.add("bossDamaged");
        }
        else{
            document.getElementById("enemy").classList.add("damaged");
        }
        document.styleSheets[2].cssRules[2].style.borderBottomColor = 'red';    //accesses the embedded html style tag in the head element to change styles from there
        document.styleSheets[2].cssRules[4].style.borderBottomColor = 'red';    //this is needed because psuedo classes aren't in the DOM tree
        document.styleSheets[2].cssRules[3].style.borderTopColor = 'red';
        document.styleSheets[2].cssRules[5].style.borderTopColor = 'red';
        setTimeout(function(){
            if (boss == true){
                document.getElementById("enemy").classList.remove("damaged");
                document.getElementById("enemy").classList.remove("bossDamaged");
            }
            else{
                document.getElementById("enemy").classList.remove("damaged");
                document.getElementById("enemy").classList.remove("bossDamaged");
            }
            document.getElementById("enemy").classList.remove("damaged")
            document.styleSheets[2].cssRules[2].style.borderBottomColor = 'green';
            document.styleSheets[2].cssRules[4].style.borderBottomColor = 'gold';
            document.styleSheets[2].cssRules[3].style.borderTopColor = 'green';
            document.styleSheets[2].cssRules[5].style.borderTopColor = 'gold';
        }, 60);
    }
}
/* equations for minimum and maximum values (helps with game balancing early/late game scaling as well as costs) */
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


// the 'deal damage' function really is just the function that checks what enemy is active, how much health it'll have, if its a boss/golden enemy, and if it dies how much money it gives (its used in the hero and click damage attacks)
function dealDamage()
{
    heroUnlockCheck();
    document.getElementById("enemyHealth").innerHTML = convrt(health);
    if (health <= 0 && boss == false)
    {
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9));
        
        maxHealth = health;

        if (isGolden == true)
        {
            gold += ((8 * allGoldMultP * goldenGoldMult * maxHealth * 0.04 + 0.0002 * (min(stage, 150)) * (Math.random() * 0.2 + 0.9)));
        }
        if (isReg == true)
        {
            gold += ((allGoldMultP * regGoldMult * maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9)));
        }
        enemyCooldown();
        setTimeout(enemyStyle, 200);

        if (Math.ceil(Math.random(1) * 50) == 1)
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
        stageAdvance();
        document.getElementById("enemyHealth").innerHTML = convrt(health);

        displayStats();
    }
    if (stageProgress > 5 && boss == false && bossChallenged == false)
    {
        bossChallenged = true;
        document.getElementById('timeStat').opacity = '1'; //timer bar appears
        bossMode();
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
        document.getElementById('timeStat').opacity = '0'; // timer bar disappears
        bossChallenged = false;
        gold += ((allGoldMultP * bossGoldMult * maxHealth * 0.04 + 0.0002 * min(stage, 150) * (Math.random() * 0.2 + 0.9) * 4));
        enemyCooldown();
        setTimeout(enemyStyle, 200);
        boss = false;
        document.getElementById("enemy").classList.remove("boss");
        stageProgress = 1;
        stage++;
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9));
        maxHealth = health;
        document.getElementById("enemyHealth").innerHTML = convrt(health);
        if (Math.ceil(Math.random(1) * 50) == 1)
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
//boss timer function (30 seconds to fight a boss enemy)
var timer = 'filler';
var bossTimerCount = 30;
var time = bossTimerCount;
function bossMode()
{
    document.getElementById('bossTime').innerHTML = time;
    timer = setInterval(bossTimer, 1000);
}
function bossTimer()
{
    /* hundreths of seconds */
    dealDamage();
    time -= 1;
    document.getElementById('bossTime').innerHTML = time;
    
    if (time <= 0 && boss == true)  //if you run out of time it takes you back to the last stage and lets you keep on getting stronger until you choose to rechallenge boss
    {
        time = 0;
        clearInterval(timer);
        time = bossTimerCount;
        document.getElementById('bossTime').innerHTML = '';
        boss = false;
        document.getElementById("enemy").classList.remove("boss");
        stageProgress = 5;
        document.getElementById('bossButton').addEventListener('click', fightBoss);
        document.getElementById('bossButton').innerHTML = 'Fight Boss';
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9));
        maxHealth = health;
    }
    if (boss == false)  //gets rid of the timer interval if a boss isn't even active
    {
        clearInterval(timer);
        time = bossTimerCount;
        document.getElementById('bossTime').innerHTML = '';
    }

}
// function for rechallenging an already failed boss
function fightBoss()
{
    bossMode();
    document.getElementById("enemy").classList.add("boss");
    document.getElementById('bossButton').removeEventListener('click', fightBoss);
    document.getElementById('bossButton').innerHTML = '...';
    stageProgress++;
    health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * 4);
    maxHealth = health;
    boss = true;
}
// advances to the next sstage and makes the bossChallenged bool false so that you can automatically beat the next boss without needing the fight boss button
function stageAdvance()
{
    if (bossChallenged == false)
    {
        stageProgress++;
    }
}
// cooldown between the previous and next enemy so that you can't progress insanely fast in certain cases
function enemyCooldown()
{
    enemyDead = true;
    document.getElementById("enemy").classList.add("killed");
    document.getElementById("enemyArea").removeEventListener("click", clickDamage);
    setTimeout(function(){document.getElementById("enemy").classList.remove("killed");}, 300);
    setTimeout(function(){enemyDead = false;}, 300);
    setTimeout(function(){document.getElementById("enemyArea").addEventListener("click", clickDamage)}, 300);
}

//enemy shape styles (for unqiue enemies)
var enemySquare = true;
var enemyCircle = false;
var enemyHexagon = false;
var enemySquircle = false;
var enemyPill = false;
var enemyEgg = false;

function enemyStyle()
{
    let r = Math.ceil(Math.random(1) * 6);
    switch (r)
    {
        case 1:
        document.getElementById("enemy").classList.add("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
        enemySquare = true;
        enemyCircle = false;
        enemyHexagon = false;
        enemySquircle = false;
        enemyPill = false;
        enemyEgg = false;
        break;

        case 2:
        document.getElementById("enemy").classList.add("enemyCircle");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
        enemySquare = false;
        enemyCircle = true;
        enemyHexagon = false;
        enemySquircle = false;
        enemyPill = false;
        enemyEgg = false;
        break;

        case 3: 
        document.getElementById("enemy").classList.add("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
        enemySquare = false;
        enemyCircle = false;
        enemyHexagon = true;
        enemySquircle = false;
        enemyPill = false;
        enemyEgg = false;
        break;

        case 4:
        document.getElementById("enemy").classList.add("enemySquircle");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemyPill");
        document.getElementById("enemy").classList.remove("enemyEgg");
        enemySquare = false;
        enemyCircle = false;
        enemyHexagon = false;
        enemySquircle = true;
        enemyPill = false;
        enemyEgg = false;
        break;

        case 5:
        document.getElementById("enemy").classList.add("enemyPill");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyEgg");
        enemySquare = false;
        enemyCircle = false;
        enemyHexagon = false;
        enemySquircle = false;
        enemyPill = true;
        enemyEgg = false;
        break;
        
        case 6:
        document.getElementById("enemy").classList.add("enemyEgg");
        document.getElementById("enemy").classList.remove("enemySquare");
        document.getElementById("enemy").classList.remove("enemyCircle");
        document.getElementById("enemy").classList.remove("enemyHexagon");
        document.getElementById("enemy").classList.remove("enemySquircle");
        document.getElementById("enemy").classList.remove("enemyPill");
        enemySquare = false;
        enemyCircle = false;
        enemyHexagon = false;
        enemySquircle = false;
        enemyPill = false;
        enemyEgg = true;
        break;
    }
}

//this section here is just for adding all of the hero damage together for the allHeroDmg variable used for true damage
var indHeroDmg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function allHeroDamage()
{
    for (i = 1; i < heroNumber.length; i++)
    {
        if(heroBought[i] == true)
        {
            indHeroDmg[i] = heroDamage[i]/heroAtkCooldown[i];
        }
    }
    
    allHeroDmg = indHeroDmg.reduce(function(a, b){
        return a + b;
    }, 0)

    trueDamage = damage[1] + (allHeroDmg * heroClickMult);
    trueDamage2 = damage[2] + (allHeroDmg * heroClickMult);
}
//heroes
//Hero 1

var h1M = [true, false, false, false, false, false, false, false, false, false];    // these are the milestones for the first hero, which check if they are unlocked or not
var hM1Cost1 = milestoneCost(1, 10);    //the costs of each milestone is determined using an equation with parameters, which is done for EVERY HERO
var hM2Cost1 = milestoneCost(1, 30);
var hM3Cost1 = milestoneCost(1, 60);
var hM4Cost1 = milestoneCost(1, 100);
var hM5Cost1 = milestoneCost(1, 200);
var hM6Cost1 = milestoneCost(1, 300);
var hM7Cost1 = milestoneCost(1, 400);
var hM8Cost1 = milestoneCost(1, 500);
var hM9Cost1 = milestoneCost(1, 1000);
hDmgMult[1] = 1;    // the individual hero damage multiplier (just for hero 1).  this will be used for individual hero multipliers (i.e. getting the hero to level 10 will double its total damage)

heroDamage[1] = heroDamage[1] * heroDamageMultP * hDmgMult[1] * heroColorDmg[2] * meleeHeroDmg;

function buyHero1()     //function buys and upgrades the hero, first checking if its unlocked to give the hero its attack interval, THEN upgrading it on future executions of this function to incease damage and cost
{
    if (gold >= hCost[1] && heroBought[1] == true)
    {
        gold -= hCost[1];
        heroDamage[1] = (allDamageMultP * heroColorDmg[2] * meleeHeroDmg * heroDamageMultP * hDmgMult[1] * (heroBaseDamage[1]/5) * (5 + heroLvl[1])  * 1.01**(heroLvl[1]));
        hCost[1] = ((hCostBase[1]/4) * (5 + heroLvl[1]) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        heroLvlMult(1);
        damageSet();
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[1] && heroBought[1] == false)
    {
        heroBought[1] = true;
        gold -= hCost[1];
        hCost[1] = ((hCostBase[1]/4) * (5 + heroLvl[1]) * 1.06**(heroLvl[1]));
        heroLvl[1]++;
        displayStats();
        heroAtk[1] = setInterval(heroAttack1, heroAtkCooldown[1]*1000);
        damageSet();
        console.log("hero 1 unlocked");
        
        document.getElementById("hero1Locked").innerHTML = "Upgrade";
    }
}
function heroAttack1()  //hero attack function for dealing damage.  This is done with EVERY HERO so I won't repeat myself. Here you will find out just how inefficient I was with this
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
    setTimeout(function(){document.getElementById("hero1Sprite").classList.add("attacking1");}, 0); //setting up attack animation
    setTimeout(function(){document.getElementById("hero1Sprite").classList.remove("attacking1");}, 100);
    setTimeout(dealDamage, 100);
}
// buying hero milestone function (very inefficient but hey it works).  This will check if previous milestones are unlocked and if the hero's level is high enough to unlock the ability to buy the milestone
//milestones are upgrades that apply to everything in the current run (gets reset on prestige).  For example, all hero damage x1.2 will upgrade ALL of the heroes' damage values by 20%, not JUST this hero.
function buyHero1Milestone()    
{
    if (h1M[1] == false && gold >= hM1Cost1 && heroLvl[1] >= 10)
    {
        gold -= hM1Cost1;
        heroDamageMultiplier(1.2);
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
        allDamageMultiplier(1.1);

        document.getElementById("hero1Button2").removeEventListener("click", buyHero1Milestone); 
        console.log('Milestone 3 Purchased');
        h1M[3] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h1M[4] == false && gold >= hM4Cost1 && heroLvl[1] >= 100 && h1M[1] == true && h1M[2] == true && h1M[3] == true)
    {
        gold -= hM4Cost1;
        allClickMultiplier(1.2);

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
        heroDamageMultiplier(1.1);

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

//Hero 2    (all heroes repeat the same format as the first)

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

heroDamage[2] = heroDamage[2] * heroDamageMultP * hDmgMult[2] * heroColorDmg[4] * rangedHeroDmg;

function buyHero2()
{
    if (gold >= hCost[2] && heroBought[2] == true)
    {
        gold -= hCost[2];
        heroDamage[2] = (allDamageMultP * heroColorDmg[4] * rangedHeroDmg * heroDamageMultP * hDmgMult[2] * (heroBaseDamage[2]/5) * (5 + heroLvl[2]) * 1.01**(heroLvl[2]));
        hCost[2] = ((hCostBase[2]/4) * (5 + heroLvl[2]) * 1.06**(heroLvl[2]));
        heroLvl[2]++;
        displayStats();
        heroLvlMult(2);
        document.getElementById("hero2Locked").innerHTML = "Upgrade"
    }
    if (gold >= hCost[2] && heroBought[2] == false)
    {
        heroBought[2] = true;
        gold -= hCost[2];
        hCost[2] = ((hCostBase[2]/4) * (5 + heroLvl[2]) * 1.06**(heroLvl[2]));
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
        allClickMultiplier(1.2);
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
        heroDamageMultiplier(1.1);

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

heroDamage[3] = heroDamage[3] * heroDamageMultP * hDmgMult[3] * heroColorDmg[1] * meleeHeroDmg;

function buyHero3()
{
    if (gold >= hCost[3] && heroBought[3] == true)
    {
        gold -= hCost[3];
        heroDamage[3] = (allDamageMultP * heroColorDmg[1] * meleeHeroDmg * heroDamageMultP * hDmgMult[3] * (heroBaseDamage[3]/5) * (5 + heroLvl[3]) * (1.01**(heroLvl[3])));
        hCost[3] = ((hCostBase[3]/4) * (5 + heroLvl[3]) * (1.06**(heroLvl[3])));
        heroLvl[3]++;
        displayStats();
        heroLvlMult(3);
        document.getElementById("hero3Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[3] && heroBought[3] == false)
    {
        heroBought[3] = true;
        gold -= hCost[3];
        hCost[3] = ((hCostBase[3]/4) * (5 + heroLvl[3]) * (1.06**(heroLvl[3])));
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
        allClickMultiplier(1.2);

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

var h4M = [true, false, false, false, false, false, false, false, false, false];
var hM1Cost4 = milestoneCost(4, 10);
var hM2Cost4 = milestoneCost(4, 30);
var hM3Cost4 = milestoneCost(4, 60);
var hM4Cost4 = milestoneCost(4, 100);
var hM5Cost4 = milestoneCost(4, 200);
var hM6Cost4 = milestoneCost(4, 300);
var hM7Cost4 = milestoneCost(4, 400);
var hM8Cost4 = milestoneCost(4, 500);
var hM9Cost4 = milestoneCost(4, 1000);

heroDamage[4] = heroDamage[4] * heroDamageMultP * hDmgMult[4] * heroColorDmg[5] * rangedHeroDmg;

function buyHero4()
{
    if (gold >= hCost[4] && heroBought[4] == true)
    {
        gold -= hCost[4];
        heroDamage[4] = (allDamageMultP * heroColorDmg[5] * rangedHeroDmg * heroDamageMultP * hDmgMult[4] * (heroBaseDamage[4]/5) * (5 + heroLvl[4]) * (1.01**(heroLvl[4])));
        hCost[4] = ((hCostBase[4]/4) * (5 + heroLvl[4]) * (1.06**(heroLvl[4])));
        heroLvl[4]++;
        displayStats();
        heroLvlMult(4);
        document.getElementById("hero4Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[4] && heroBought[4] == false)
    {
        heroBought[4] = true;
        gold -= hCost[4];
        hCost[4] = ((hCostBase[4]/4) * (5 + heroLvl[4]) * (1.06**(heroLvl[4])));
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
function buyHero4Milestone()
{
    if (h4M[1] == false && gold >= hM1Cost4 && heroLvl[4] >= 10)
    {
        gold -= hM1Cost4;
        heroPurpleMultiplier(1.25);
        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        h4M[1] = true;
        console.log('Milestone 1 Purchased');
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[2] == false && gold >= hM2Cost4 && heroLvl[4] >= 30 && h4M[1] == true)
    {
        gold -= hM2Cost4;
        heroClickMult += 0.001;
        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 2 Purchased');
        h4M[2] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[3] == false && gold >= hM3Cost4 && heroLvl[4] >= 60 && h4M[1] == true && h4M[2] == true)
    {
        gold -= hM3Cost4;
        allClickMultiplier(1.2);

        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 3 Purchased');
        h4M[3] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[4] == false && gold >= hM4Cost4 && heroLvl[4] >= 100 && h4M[1] == true && h4M[2] == true && h4M[3] == true)
    {
        gold -= hM4Cost4;
        heroDamageMultiplier(1.1);

        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 4 Purchased');
        h4M[4] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[5] == false && gold >= hM5Cost4 && heroLvl[4] >= 200 && h4M[1] == true && h4M[2] == true && h4M[3] == true && h4M[4] == true)
    {
        gold -= hM5Cost4;
        rangedHeroMultiplier(1.1);
        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 5 Purchased');
        h4M[5] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[6] == false && gold >= hM6Cost4 && heroLvl[4] >= 300 && h4M[1] == true && h4M[2] == true && h4M[3] == true && h4M[4] == true && h4M[5] == true)
    {
        gold -= hM6Cost4;
        allGoldMult *= 1.1;

        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 6 Purchased');
        h4M[6] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[7] == false && gold >= hM7Cost4 && heroLvl[4] >= 400 && h4M[1] == true && h4M[2] == true && h4M[3] == true && h4M[4] == true && h4M[5] == true && h4M[6] == true)
    {
        gold -= hM7Cost4;
        clickCritChance += 0.25;

        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 7 Purchased');
        h4M[7] = true;
        heroUnlockCheck();
        displayStats();
    }
    if (h4M[8] == false && gold >= hM8Cost4 && heroLvl[4] >= 500 && h4M[1] == true && h4M[2] == true && h4M[3] == true && h4M[4] == true && h4M[5] == true && h4M[6] == true && h4M[7] == true)
    {
        gold -= hM8Cost4;
        clickCritMult *= 1.1;
        document.getElementById("hero4Button2").removeEventListener("click", buyHero4Milestone); 
        console.log('Milestone 8 Purchased');
        h4M[8] = true;
        heroUnlockCheck();
        displayStats();
    } 
}

//Hero 5
hDmgMult[5] = 1;

heroDamage[5] = heroDamage[5] * heroDamageMultP * hDmgMult[5] * heroColorDmg[6] * meleeHeroDmg;

function buyHero5()
{
    if (gold >= hCost[5] && heroBought[5] == true)
    {
        gold -= hCost[5];
        heroDamage[5] = (allDamageMultP * heroColorDmg[6] * meleeHeroDmg * heroDamageMultP * hDmgMult[5] * (heroBaseDamage[5]/5) * (5 + heroLvl[5]) * (1.01**(heroLvl[5])));
        hCost[5] = ((hCostBase[5]/4) * (5 + heroLvl[5]) * (1.06**(heroLvl[5]))); 
        heroLvl[5]++;
        displayStats();
        heroLvlMult(5);
        document.getElementById("hero5Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[5] && heroBought[5] == false)
    {
        heroBought[5] = true;
        gold -= hCost[5];
        hCost[5] = ((hCostBase[5]/4) * (5 + heroLvl[5]) * (1.06**(heroLvl[5]))); 
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
heroDamage[6] = heroDamage[6] * heroDamageMultP * hDmgMult[6] * heroColorDmg[3] * meleeHeroDmg;

function buyHero6()
{
    if (gold >= hCost[6] && heroBought[6] == true)
    {
        gold -= hCost[6];
        heroDamage[6] = (allDamageMultP * heroColorDmg[3] * meleeHeroDmg * heroDamageMultP * hDmgMult[6] * (heroBaseDamage[6]/5) * (5 + heroLvl[6]) * (1.01**(heroLvl[6])));
        hCost[6] = ((hCostBase[6]/4) * (5 + heroLvl[6]) * (1.06**(heroLvl[6])));
        heroLvl[6]++;
        displayStats();
        heroLvlMult(6);
        document.getElementById("hero6Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[6] && heroBought[6] == false)
    {
        heroBought[6] = true;
        gold -= hCost[6];
        hCost[6] = ((hCostBase[6]/4) * (5 + heroLvl[6]) * (1.06**(heroLvl[6])));
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

heroDamage[7] = heroDamage[7] * heroDamageMultP * hDmgMult[7] * heroColorDmg[4] * rangedHeroDmg;

function buyHero7()
{
    if (gold >= hCost[7] && heroBought[7] == true)
    {
        gold -= hCost[7];
        heroDamage[7] = (allDamageMultP * heroColorDmg[4] * rangedHeroDmg * heroDamageMultP * hDmgMult[7] * (heroBaseDamage[7]/5) * (5 + heroLvl[7]) * (1.01**(heroLvl[7])));
        hCost[7] = ((hCostBase[7]/4) * (5 + heroLvl[7]) * (1.06**(heroLvl[7])));
        heroLvl[7]++;
        displayStats();
        heroLvlMult(7);
        document.getElementById("hero7Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[7] && heroBought[7] == false)
    {
        heroBought[7] = true;
        gold -= hCost[7];
        hCost[7] = ((hCostBase[7]/4) * (5 + heroLvl[7]) * (1.06**(heroLvl[7])));
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

heroDamage[8] = heroDamage[8] * heroDamageMultP * hDmgMult[8] * heroColorDmg[5] * rangedHeroDmg;

function buyHero8()
{
    if (gold >= hCost[8] && heroBought[8] == true)
    {
        gold -= hCost[8];
        heroDamage[8] = (allDamageMultP * heroColorDmg[5] * rangedHeroDmg * heroDamageMultP * hDmgMult[8] * (heroBaseDamage[8]/5) * (5 + heroLvl[8]) * (1.01**(heroLvl[8])));
        hCost[8] = ((hCostBase[8]/4) * (5 + heroLvl[8]) * (1.06**(heroLvl[8])));
        heroLvl[8]++;
        displayStats();
        heroLvlMult(8);
        document.getElementById("hero8Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[8] && heroBought[8] == false)
    {
        heroBought[8] = true;
        gold -= hCost[8];
        hCost[8] = ((hCostBase[8]/4) * (5 + heroLvl[8]) * (1.06**(heroLvl[8])));
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

heroDamage[9] = heroDamage[9] * heroDamageMultP * hDmgMult[9] * heroColorDmg[1] * meleeHeroDmg;

function buyHero9()
{
    if (gold >= hCost[9] && heroBought[9] == true)
    {
        gold -= hCost[9];
        heroDamage[9] = (allDamageMultP * heroColorDmg[1] * meleeHeroDmg * heroDamageMultP * hDmgMult[9] * (heroBaseDamage[9]/5) * (5 + heroLvl[9]) * (1.01**(heroLvl[9])));
        hCost[9] = ((hCostBase[9]/4) * (5 + heroLvl[9]) * (1.06**(heroLvl[9])));
        heroLvl[9]++;
        displayStats();
        heroLvlMult(9);
        document.getElementById("hero9Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[9] && heroBought[9] == false)
    {
        heroBought[9] = true;
        gold -= hCost[9];
        hCost[9] = ((hCostBase[9]/4) * (5 + heroLvl[9]) * (1.06**(heroLvl[9])));
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

//Hero 10
hDmgMult[10] = 1;

heroDamage[10] = allDamageMultP * heroDamage[10] * heroDamageMultP * hDmgMult[10] * heroColorDmg[3] * rangedHeroDmg;

function buyHero10()
{
    if (gold >= hCost[10] && heroBought[10] == true)
    {
        gold -= hCost[10];
        heroDamage[10] = (allDamageMultP * heroColorDmg[3] * rangedHeroDmg * heroDamageMultP * hDmgMult[10] * (heroBaseDamage[10]/5) * (5 + heroLvl[10]) * (1.01**(heroLvl[10])));
        hCost[10] = ((hCostBase[10]/4) * (5 + heroLvl[10]) * (1.06**(heroLvl[10])));
        heroLvl[10]++;
        displayStats();
        heroLvlMult(10);
        document.getElementById("hero10Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[10] && heroBought[10] == false)
    {
        heroBought[10] = true;
        gold -= hCost[10];
        hCost[10] = ((hCostBase[10]/4) * (5 + heroLvl[10]) * (1.06**(heroLvl[10])));
        heroLvl[10]++;
        displayStats();
        heroAtk[10] = setInterval(heroAttack10, heroAtkCooldown[10]*1000);
        console.log("hero 10 unlocked");
        document.getElementById("hero10Locked").innerHTML = "Upgrade";
    }

    
}
function heroAttack10()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[10]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero10Sprite").classList.add("attacking10");}, 0);
    setTimeout(function(){document.getElementById("hero10Sprite").classList.remove("attacking10");}, 150);
    setTimeout(dealDamage, 100);
}
//Hero 11
hDmgMult[11] = 1;

heroDamage[11] = allDamageMultP * heroDamage[11] * heroDamageMultP * hDmgMult[11] * heroColorDmg[3] * rangedHeroDmg;

function buyHero11()
{
    if (gold >= hCost[11] && heroBought[11] == true)
    {
        gold -= hCost[11];
        heroDamage[11] = (allDamageMultP * heroColorDmg[6] * meleeHeroDmg * heroDamageMultP * hDmgMult[11] * (heroBaseDamage[11]/5) * (5 + heroLvl[11]) * (1.01**(heroLvl[11])));
        hCost[11] = ((hCostBase[11]/4) * (5 + heroLvl[11]) * (1.06**(heroLvl[11])));
        heroLvl[11]++;
        displayStats();
        heroLvlMult(11);
        document.getElementById("hero11Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[11] && heroBought[11] == false)
    {
        heroBought[11] = true;
        gold -= hCost[11];
        hCost[11] = ((hCostBase[11]/4) * (5 + heroLvl[11]) * (1.06**(heroLvl[11])));
        heroLvl[11]++;
        displayStats();
        heroAtk[11] = setInterval(heroAttack11, heroAtkCooldown[11]*1000);
        console.log("hero 11 unlocked");
        document.getElementById("hero11Locked").innerHTML = "Upgrade";
    }
}
function heroAttack11()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[11]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero11Sprite").classList.add("attacking11");}, 0);
    setTimeout(function(){document.getElementById("hero11Sprite").classList.remove("attacking11");}, 100);
    setTimeout(dealDamage, 100);
}
hDmgMult[12] = 1;

heroDamage[12] = allDamageMultP * heroDamage[12] * heroDamageMultP * hDmgMult[12] * heroColorDmg[3] * rangedHeroDmg;

function buyHero12()
{
    if (gold >= hCost[12] && heroBought[12] == true)
    {
        gold -= hCost[12];
        heroDamage[12] = (allDamageMultP * heroColorDmg[2] * rangedHeroDmg * heroDamageMultP * hDmgMult[12] * (heroBaseDamage[12]/5) * (5 + heroLvl[12]) * (1.01**(heroLvl[12])));
        hCost[12] = ((hCostBase[12]/4) * (5 + heroLvl[12]) * (1.06**(heroLvl[12])));
        heroLvl[12]++;
        displayStats();
        heroLvlMult(12);
        document.getElementById("hero12Locked").innerHTML = "Upgrade";
    }
    if (gold >= hCost[12] && heroBought[12] == false)
    {
        heroBought[12] = true;
        gold -= hCost[12];
        hCost[12] = ((hCostBase[12]/4) * (5 + heroLvl[12]) * (1.06**(heroLvl[12])));
        heroLvl[12]++;
        displayStats();
        heroAtk[12] = setInterval(heroAttack12, heroAtkCooldown[12]*1000);
        console.log("hero 12 unlocked");
        document.getElementById("hero12Locked").innerHTML = "Upgrade";
    }
}
function heroAttack12()
{
    if (enemyDead == false)
    {
        health = (health - (heroDamage[12]));
    }
    
    displayStats();
    if (health <= 0)
    {
        health = 0;
    }
    setTimeout(function(){document.getElementById("hero12Sprite").classList.add("attacking12");}, 0);
    setTimeout(function(){document.getElementById("hero12Sprite").classList.remove("attacking12");}, 100);
    setTimeout(dealDamage, 100);
}

// checking for hero unlocks, mainly displaying their milestone unlocks within a button, and at what level the milestone gets unlocked, and what they do

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
    if (heroLvl[4] >= 10 && h4M[1] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Purple Hero Damage x 1.25";
        document.getElementById("hMCost4").innerHTML = convrt(hM1Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 10 && h4M[1] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 30)";
        document.getElementById("hMCost4").innerHTML = convrt(hM2Cost4);
    }
    if (heroLvl[4] >= 30 && h4M[2] == false)
    {
        document.getElementById("hero4M1").innerHTML = "+0.1% hero DPS to Click Dmg";
        document.getElementById("hMCost4").innerHTML = convrt(hM2Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
        
    }
    if (heroLvl[4] >= 30 && h4M[2] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 60)";
        document.getElementById("hMCost4").innerHTML = convrt(hM3Cost4);
    }
    if (heroLvl[4] >= 60 && h4M[3] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Click Damage x 1.1";
        document.getElementById("hMCost4").innerHTML = convrt(hM3Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 60 && h4M[3] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 100)";
        document.getElementById("hMCost4").innerHTML = convrt(hM4Cost4);
    }
    if (heroLvl[4] >= 100 && h4M[4] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Hero Damage x 1.1";
        document.getElementById("hMCost4").innerHTML = convrt(hM4Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 100 && h4M[4] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 200)";
        document.getElementById("hMCost4").innerHTML = convrt(hM5Cost4);
    }
    if (heroLvl[4] >= 200 && h4M[5] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Ranged Hero Damage x 1.1";
        document.getElementById("hMCost4").innerHTML = convrt(hM5Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 200 && h4M[5] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 300)";
        document.getElementById("hMCost4").innerHTML = convrt(hM6Cost4);
    }
    if (heroLvl[4] >= 300 && h4M[6] == false)
    {
        document.getElementById("hero4M1").innerHTML = "All Gold x 1.1";
        document.getElementById("hMCost4").innerHTML = convrt(hM6Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 300 && h4M[6] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 400)";
        document.getElementById("hMCost4").innerHTML = convrt(hM7Cost4);
    }
    if (heroLvl[4] >= 400 && h4M[7] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Crit Chance + 0.25%";
        document.getElementById("hMCost4").innerHTML = convrt(hM7Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 400 && h4M[7] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 500)";
        document.getElementById("hMCost4").innerHTML = convrt(hM8Cost4);
    }
    if (heroLvl[4] >= 500 && h4M[8] == false)
    {
        document.getElementById("hero4M1").innerHTML = "Crit Damage x 1.1";
        document.getElementById("hMCost4").innerHTML = convrt(hM8Cost4);
        document.getElementById("hero4Button2").addEventListener("click", buyHero4Milestone); 
    }
    if (heroLvl[4] >= 500 && h4M[8] == true)
    {
        document.getElementById("hero4M1").innerHTML = "Milestone (Lvl. 1000)";
        document.getElementById("hMCost4").innerHTML = convrt(hM9Cost4);
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
    //hero 10 unlocks
    if (stage > 0 && heroUnlocked[10] == false)
    {
        heroUnlocked[10] = true;
        document.getElementById("hero10Button").addEventListener("click", buyHero10);
        document.getElementById("hCost10").innerHTML = convrt(hCost[10]);
    }
    //hero 11 unlocks
    if (stage > 0 && heroUnlocked[11] == false)
    {
        heroUnlocked[11] = true;
        document.getElementById("hero11Button").addEventListener("click", buyHero11);
        document.getElementById("hCost11").innerHTML = convrt(hCost[11]);
    }
    //hero 12 unlocks
    if (stage > 0 && heroUnlocked[12] == false)
    {
        heroUnlocked[12] = true;
        document.getElementById("hero12Button").addEventListener("click", buyHero12);
        document.getElementById("hCost12").innerHTML = convrt(hCost[12]);
    }
}

//hero damage mini milestones (i.e. at lvl 20 for ANY hero their damage doubles)
//this function can be applied to any hero, and will multiply that specific hero's stats by said multiplier if they reach a certain level
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
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1100)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1150)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1200)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1250)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 1300)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1350)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1400)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1450)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1500)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 1550)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1600)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1650)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1700)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1750)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 1800)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1850)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1900)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 1950)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2000)
    {
        hDmgMult[i] *= 100;
        heroDamage[i] *= 100;
    }
    if (heroLvl[i] == 2050)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2100)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2150)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2200)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2250)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 2300)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2350)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2400)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2450)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2500)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 2550)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2600)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2650)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2700)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2750)
    {
        hDmgMult[i] *= 10;
        heroDamage[i] *= 10;
    }
    if (heroLvl[i] == 2800)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2850)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2900)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 2950)
    {
        hDmgMult[i] *= 5;
        heroDamage[i] *= 5;
    }
    if (heroLvl[i] == 3000)
    {
        hDmgMult[i] *= 100;
        heroDamage[i] *= 100;
    }
}


// click upgrades
var clickBaseCost = 5;
function upgrade()
{
    if (gold >= clickUpCost)
    {
        gold -= clickUpCost;
        damage[1] = (allDamageMultP * clickDamageMult[1] * (4 + clickLevel[1]) * (1.01**(clickLevel[1] - 1)));
        clickUpCost = ((clickBaseCost/5) * (5 + clickLevel[1]) * (1.055**(clickLevel[1] - 1)));
        clickLevel[1]++;
        displayStats();
        clickMultCheck(1);
    }
}
var clickBaseCost2 = 5;
function upgrade2()
{
    if (gold >= clickUpCost2)
    {
        gold -= clickUpCost2;
        damage[2] = (allDamageMultP * clickDamageMult[2] * (4 + clickLevel[2]) * (1.01**(clickLevel[2] - 1)));
        clickUpCost2 = ((clickBaseCost2/5) * (5 + clickLevel[2]) * (1.055**(clickLevel[2] - 1)));
        clickLevel[2]++;
        displayStats();
        clickMultCheck(2);
    }
}
//similar to the function heroLvlMult(), this function checks if ANY click player is at a certain level and will multiply their individual damage
function clickMultCheck(i)
{
    if (clickLevel[i] == 10)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 25)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 50)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 75)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 100)
    {
        damage[i] *= 4;
        clickDamageMult[i] *= 4;
    }
    if (clickLevel[i] == 120)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 140)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 160)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 180)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 200)
    {
        damage[i] *= 4;
        clickDamageMult[i] *= 4;
    }
    if (clickLevel[i] == 220)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 240)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 260)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 280)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 300)
    {
        damage[i] *= 4;
        clickDamageMult[i] *= 4;
    }
    if (clickLevel[i] == 325)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 350)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 375)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 400)
    {
        damage[i] *= 4;
        clickDamageMult[i] *= 4;
    }
    if (clickLevel[i] == 425)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 450)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 475)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 500)
    {
        damage[i] *= 5;
        clickDamageMult[i] *= 5;
    }
    if (clickLevel[i] == 530)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 560)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 590)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 620)
    {
        damage[i] *= 5;
        clickDamageMult[i] *= 5;
    }
    if (clickLevel[i] == 650)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 680)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 710)
    {
        damage[i] *= 5;
        clickDamageMult[i] *= 5;
    }
    if (clickLevel[i] == 740)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 770)
    {
        damage[i] *= 2;
        clickDamageMult[i] *= 2;
    }
    if (clickLevel[i] == 800)
    {
        damage[i] *= 5;
        clickDamageMult[i] *= 5;
    }
    if (clickLevel[i] == 850)
    {
        damage[i] *= 3;
        clickDamageMult[i] *= 3;
    }
    if (clickLevel[i] == 900)
    {
        damage[i] *= 4;
        clickDamageMult[i] *= 4;
    }
    if (clickLevel[i] == 950)
    {
        damage[i] *= 3;
        clickDamageMult[i] *= 3;
    }
    if (clickLevel[i] == 1000)
    {
        damage[i] *= 10;
        clickDamageMult[i] *= 10;
    }
}

//milestone multiplier functions.  These are made so that I can easily repeat types of multipliers with these functions.  For example, if a certain hero wants to multiply all damage by 1.1, I just call the function allDamageMultiplier(i) with the parameter of 1.1.
function allClickMultiplier(i)
{
    damage[1] *= i;
    damage[2] *= i;
    for (j = 1; j < 3; j++)
    {
        clickDamageMult[j] *= i;
    }
}
function allDamageMultiplier(i)
{
    allDamageMult *= i;
    for (j = 1; j < heroDamage.length; j++)
        {
            heroDamage[j] *= i;
        }
    damage[1] *= i;
    damage[2] *= i;
    allDamageMultP = allDamageMult * (totalArtDmg + 1) * coreStrengthMult;
    heroDamageMultP = heroDamageMult * inspDiamMult;
}
function heroDamageMultiplier(i)
{
    for (j = 1; j < heroDamage.length; j++)
        {
            heroDamage[j] *= i;
        }
    heroDamageMult = heroDamageMult * i;
    heroDamageMultP = heroDamageMult * inspDiamMult;
}
function rangedHeroMultiplier(i)
{
    rangedHeroDmg *= i;
    heroDamage[2] *= i;
    heroDamage[4] *= i;
    heroDamage[7] *= i;
    heroDamage[8] *= i;
    heroDamage[10] *= i;
    heroDamage[12] *= i;
}
function meleeHeroMultiplier(i)
{
    meleeHeroDmg *= i;
    heroDamage[1] *= i;
    heroDamage[3] *= i;
    heroDamage[5] *= i;
    heroDamage[6] *= i;
    heroDamage[9] *= i;
    heroDamage[11] *= i;
}
function heroBlueMultiplier(i)
{
    heroColorDmg[2] *= i;
    heroDamage[1] *= i;
    heroDamage[12] *= i;
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
    heroDamage[11] *= i;
}
function heroYellowMultiplier(i)
{
    heroColorDmg[3] *= i;
    heroDamage[6] *= i;
    heroDamage[10] *= i;
}

//milestone cost function
function milestoneCost(i, j)
{
    return ((hCostBase[i]) * ([j]) * 1.06**(j));
}

// abilities section
var abilityBought = [false, false];
var abilityActive = [false, false];

var aCooldownBase = [0, 90];
var aCooldown = [0, 0];
var aDurationBase = [0, 30];
var aDuration = [0, 0];

// like the buy hero function, this will buy the ability (so long as you are past stage 10 and have sufficient funds)
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

// uses the first ability (shape rage) which will multiply all hero damage by a given value AND increase their attack speed by 2x.
function useAbility1()
{
    if (aCooldown[1] == 0)
    {
        abilityActive[1] = true;
        console.log("shape rage activated");
        aCooldown[1] = aCooldownBase[1];
        aDuration[1] = aDurationBase[1];
        heroDamageMult *= shapeRageMult; 
        for (i = 1; i <= heroNumber.length; i++)    //resetting hero intervals so that they can attack twice as fast.  (this needs to be reset so that infinite hero attacks can't be made)
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
        if (heroBought[10] == true)
        {
            heroAtk[10] = setInterval(heroAttack10, heroAtkCooldown[10]*500);
        }
        if (heroBought[11] == true)
        {
            heroAtk[11] = setInterval(heroAttack11, heroAtkCooldown[11]*500);
        }
        if (heroBought[12] == true)
        {
            heroAtk[12] = setInterval(heroAttack12, heroAtkCooldown[12]*500);
        }
        
        var cooldown = setInterval(function(){  //if the cooldown is 0 then the ability can be used once again
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

            if (aDuration[1] <= 0)      //when the DURATIOn of the ability ends the heroes attack go back to normal
            {
                aDuration[1] = 0;
                abilityActive[1] = false;
                clearInterval(duration);
                heroDamageMult /= shapeRageMult; 
                for (i = 1; i <= heroNumber.length; i++)
                {
                    heroDamage[i] /= shapeRageMult;     //hero attack damage back to normal
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
                if (heroBought[10] == true)
                {
                    heroAtk[10] = setInterval(heroAttack10, heroAtkCooldown[10]*1000);
                }
                if (heroBought[11] == true)
                {
                    heroAtk[11] = setInterval(heroAttack11, heroAtkCooldown[11]*1000);
                }
                if (heroBought[12] == true)
                {
                    heroAtk[12] = setInterval(heroAttack12, heroAtkCooldown[12]*1000);
                }
                console.log("shape rage ended");
            }
        }, 1000);
    }
}


//stat displaying

document.getElementById("enemyHealth").innerHTML = convrt(health);
document.getElementById("damage").innerHTML = convrt(damage);
document.getElementById("stage").innerHTML = stage;
document.getElementById("enemyNum").innerHTML = stageProgress+"/5";;
document.getElementById("gold").innerHTML = gold;
document.getElementById("clickLevel").innerHTML = clickLevel;
document.getElementById("cost").innerHTML = convrt(clickUpCost);

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
document.getElementById("hMCost4").innerHTML = convrt(hM1Cost4);


document.getElementById("aCost1").innerHTML = 'Stage 10';
//sets the damage of heroes up (outside of their upgrades) just in case an artifact is upgraded without upgrading a hero so the damage is proper at all times
function damageSet()
{
    heroDamage[1] = (allDamageMultP * heroColorDmg[2] * meleeHeroDmg * heroDamageMultP * hDmgMult[1] * (heroBaseDamage[1]/5) * (5 + heroLvl[1])  * 1.01**(heroLvl[1]));
    heroDamage[2] = (allDamageMultP * heroColorDmg[4] * rangedHeroDmg * heroDamageMultP * hDmgMult[2] * (heroBaseDamage[2]/5) * (5 + heroLvl[2]) * 1.01**(heroLvl[2]));
    heroDamage[3] = (allDamageMultP * heroColorDmg[1] * meleeHeroDmg * heroDamageMultP * hDmgMult[3] * (heroBaseDamage[3]/5) * (5 + heroLvl[3]) * (1.01**(heroLvl[3])));
    heroDamage[4] = (allDamageMultP * heroColorDmg[5] * rangedHeroDmg * heroDamageMultP * hDmgMult[4] * (heroBaseDamage[4]/5) * (5 + heroLvl[4]) * (1.01**(heroLvl[4])));
    heroDamage[5] = (allDamageMultP * heroColorDmg[6] * meleeHeroDmg * heroDamageMultP * hDmgMult[5] * (heroBaseDamage[5]/5) * (5 + heroLvl[5]) * (1.01**(heroLvl[5])));
    heroDamage[6] = (allDamageMultP * heroColorDmg[3] * meleeHeroDmg * heroDamageMultP * hDmgMult[6] * (heroBaseDamage[6]/5) * (5 + heroLvl[6]) * (1.01**(heroLvl[6])));
    heroDamage[7] = (allDamageMultP * heroColorDmg[4] * rangedHeroDmg * heroDamageMultP * hDmgMult[7] * (heroBaseDamage[7]/5) * (5 + heroLvl[7]) * (1.01**(heroLvl[7])));
    heroDamage[8] = (allDamageMultP * heroColorDmg[5] * rangedHeroDmg * heroDamageMultP * hDmgMult[8] * (heroBaseDamage[8]/5) * (5 + heroLvl[8]) * (1.01**(heroLvl[8])));
    heroDamage[9] = (allDamageMultP * heroColorDmg[1] * meleeHeroDmg * heroDamageMultP * hDmgMult[9] * (heroBaseDamage[9]/5) * (5 + heroLvl[9]) * (1.01**(heroLvl[9])));
    heroDamage[10] = (allDamageMultP * heroColorDmg[3] * rangedHeroDmg * heroDamageMultP * hDmgMult[10] * (heroBaseDamage[10]/5) * (5 + heroLvl[10]) * (1.01**(heroLvl[10])));
    heroDamage[11] = (allDamageMultP * heroColorDmg[6] * meleeHeroDmg * heroDamageMultP * hDmgMult[11] * (heroBaseDamage[11]/5) * (5 + heroLvl[11]) * (1.01**(heroLvl[11])));
    heroDamage[12] = (allDamageMultP * heroColorDmg[2] * rangedHeroDmg * heroDamageMultP * hDmgMult[12] * (heroBaseDamage[12]/5) * (5 + heroLvl[12]) * (1.01**(heroLvl[12])));
    damage[1] = (allDamageMultP * clickDamageMult[1] * (4 + clickLevel[1]) * (1.01**(clickLevel[1] - 1)));
    damage[2] = (allDamageMultP * clickDamageMult[2] * (4 + clickLevel[2]) * (1.01**(clickLevel[2] - 1)));
}
//sets the multipliers up (the ones that are constant due to artifacts)
function multiplierSet()
{
    allDamageMultP = allDamageMult * (1 + totalArtDmg) * coreStrengthMult;
    allGoldMultP = allGoldMult * radiantCubeMult;
    clickCritMultP = clickCritMult * honedTriMult;
    heroDamageMultP = heroDamageMult * inspDiamMult;
}
// this function is vital for showing everything on the website itself.  It also runs some functions to check values
function displayStats()
{
    heroUnlockCheck();
    allHeroDamage();
    damageSet();
    multiplierSet();

    document.getElementById("enemyHealth").innerHTML = convrt(health);
    document.getElementById("damage").innerHTML = convrt(trueDamage);
    document.getElementById("damage2").innerHTML = convrt(trueDamage2);
    document.getElementById("stage").innerHTML = stage;
    document.getElementById("enemyNum").innerHTML = stageProgress+"/5";;
    if (boss == true)
    {
        document.getElementById("enemyNum").innerHTML = "Boss";
    }
    document.getElementById("gold").innerHTML = convrt(gold);
    document.getElementById("clickLevel").innerHTML = clickLevel[1];
    document.getElementById("clickLevel2").innerHTML = clickLevel[2];
    document.getElementById("cost").innerHTML = convrt(clickUpCost);
    document.getElementById("cost2").innerHTML = convrt(clickUpCost2);
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
        document.getElementById("hCost10").innerHTML = convrt(hCost[10]);
        document.getElementById("hCost11").innerHTML = convrt(hCost[11]);
        document.getElementById("hCost12").innerHTML = convrt(hCost[12]);
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

    document.getElementById("hero10Lvl").innerHTML = heroLvl[10];
    document.getElementById("hero10Damage").innerHTML = convrt(heroDamage[10]);

    document.getElementById("hero11Lvl").innerHTML = heroLvl[11];
    document.getElementById("hero11Damage").innerHTML = convrt(heroDamage[11]);

    document.getElementById("hero12Lvl").innerHTML = heroLvl[12];
    document.getElementById("hero12Damage").innerHTML = convrt(heroDamage[12]);

    /* Ability Stuff */
    document.getElementById("aLvl1").innerHTML = aLvl[1];
    document.getElementById("shapeRageMult").innerHTML = convrt(shapeRageMult);
    document.getElementById("aCooldown1").innerHTML = convrt(aCooldown[1]);
    document.getElementById("aDuration1").innerHTML = convrt(aDuration[1]);
    document.getElementById("aCooldownBase1").innerHTML = convrt(aCooldownBase[1]);
    document.getElementById("aDurationBase1").innerHTML = convrt(aDurationBase[1]);

    /* prestige stuff */
    if (stage >=80)
    {
        document.getElementById("artifactEarn").innerHTML = "Restart and Earn "+convrt(Math.ceil(((stage - 69) / 14)**1.75))+" Shapestone";
    }
    else 
    {
        document.getElementById("artifactEarn").innerHTML = "Unlock at Stage 80";
    }
    document.getElementById("shapestoneAmount").innerHTML = convrt(shapestone);
    document.getElementById("artifactBCost").innerHTML = convrt(artUnlockCost);
    document.getElementById("totalArtDmg").innerHTML = convrt(1 + totalArtDmg);
    if (artUnlocked[1] == true)
    {
        document.getElementById("art1Cost").innerHTML = convrt(artifact1.upCost);
        document.getElementById("art1Lvl").innerHTML = convrt(artifact1.level);
        document.getElementById("art1Dmg").innerHTML = convrt(artifact1.artDmg);
        document.getElementById("art1Mult").innerHTML = convrt(artifact1.artMult);
    }
    if (artUnlocked[2] == true)
    {
        document.getElementById("art2Cost").innerHTML = convrt(artifact2.upCost);
        document.getElementById("art2Lvl").innerHTML = convrt(artifact2.level);
        document.getElementById("art2Dmg").innerHTML = convrt(artifact2.artDmg);
        document.getElementById("art2Mult").innerHTML = convrt(artifact2.artMult);
    }
    if (artUnlocked[3] == true)
    {
        document.getElementById("art3Cost").innerHTML = convrt(artifact3.upCost);
        document.getElementById("art3Lvl").innerHTML = convrt(artifact3.level);
        document.getElementById("art3Dmg").innerHTML = convrt(artifact3.artDmg);
        document.getElementById("art3Mult").innerHTML = convrt(artifact3.artMult);
    }
    if (artUnlocked[4] == true)
    {
        document.getElementById("art4Cost").innerHTML = convrt(artifact4.upCost);
        document.getElementById("art4Lvl").innerHTML = convrt(artifact4.level);
        document.getElementById("art4Dmg").innerHTML = convrt(artifact4.artDmg);
        document.getElementById("art4Mult").innerHTML = convrt(artifact4.artMult);
    }
    /* Health Bar Stuff */
    document.getElementById("healthStat").style.backgroundSize = ((health/maxHealth) * 100)+"% 100%";

    /* timer stuff */
    if (boss == true){
        document.getElementById("timeStat").style.backgroundSize = (((time - 1)/bossTimerCount) * 100)+"% 100%";
    }
    else{
        document.getElementById("timeStat").style.backgroundSize = (((time)/bossTimerCount) * 100)+"% 100%";
    }
    
}
//this function is for upgrading heroes or click levels multiple times
function multiUpgrade()
{
    var h = prompt("Which Hero would you like to upgrade? (Type in their number value.  Type P1 for upgrading Player 1, Type P2 for upgrading Player 2)");
    var t = prompt("How many times would you like to upgrade them?");
    if (h != 'P1' || h != 'P2')
    {
        parseInt(h);
        parseInt(t);
    }
    if (h == 'P1')
    {
        for (var i = 0; i < t; i++)
        {
            upgrade();
        }
    }
    if (h == 'P2')
    {
        for (var i = 0; i < t; i++)
        {
            upgrade2();
        }
    }
    if (h == 1 && heroBought[1] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero1();
        }
    }
    if (h == 2 && heroBought[2] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero2();
        }
    }
    if (h == 3 && heroBought[3] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero3();
        }
    }
    if (h == 4 && heroBought[4] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero4();
        }
    }
    if (h == 5 && heroBought[5] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero5();
        }
    }
    if (h == 6 && heroBought[6] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero6();
        }
    }
    if (h == 7 && heroBought[7] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero7();
        }
    }
    if (h == 8 && heroBought[8] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero8();
        }
    }
    if (h == 9 && heroBought[9] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero9();
        }
    }
    if (h == 10 && heroBought[10] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero10();
        }
    }
    if (h == 11 && heroBought[11] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero11();
        }
    }
    if (h == 12 && heroBought[12] == true)
    {
        for (var i = 0; i < t; i++)
        {
            buyHero12();
        }
    }
}
//these functions here are purely for informational display so players of this game know what individual level multipliers to look out for
document.getElementById("multInfoButton").addEventListener("click", showMultInfo);
function showMultInfo()
{
    document.getElementById("multInfoButton").innerHTML = "Hide Levelling Info";
    document.getElementById("multiplierInfo").style.display = "flex";
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
// empty function for now
function milestoneLoad()
{
    if (h1M[1] == true)
    {

    }
}

/* GAME SAVING ---------------------------------------------------------------------- */
/* ---------------------------------------faust-------------------------------------- */
function reloadFunction()   //gives a warning for users leaving/refreshing the site so that they don't easily lose things
{
    return "Are you sure you want to leave the site?  Make sure you have saved your progress.";
}
function setPassword()  //sets up a password that needs to be typed in when saving
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
// runs the Save game function in a second after clicking
function saveGame()
{
    if (passSet == true)
    {
        var pass = prompt("What is the password?")
        if (pass == savePass)
        {
            for (i = 1; i < aLvl.length; i++)       //abilities get disabled when saving to avoid improper damage values being saved
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
    
}   //this is the function that actually runs when the ame is saved.  It saves literally any variable that needs to be saved.
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
    localStorage.setItem('heroNumber', JSON.stringify(heroNumber));

    localStorage.setItem('damage', JSON.stringify(damage));
    localStorage.setItem('clickDamageMult', JSON.stringify(clickDamageMult));
    localStorage.setItem('clickCritMult', JSON.stringify(clickCritMult));
    localStorage.setItem('clickCritChance', JSON.stringify(clickCritChance));
    localStorage.setItem('clickLevel', JSON.stringify(clickLevel));
    localStorage.setItem('clickUpCost', JSON.stringify(clickUpCost));
    localStorage.setItem('clickUpCost2', JSON.stringify(clickUpCost2));

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
    localStorage.setItem('h4M', JSON.stringify(h4M));

    localStorage.setItem('allHeroDmg', JSON.stringify(allHeroDmg));
    localStorage.setItem('heroClickMult', JSON.stringify(heroClickMult));
    localStorage.setItem('trueDamage', JSON.stringify(trueDamage));
    localStorage.setItem('bossChallenged', JSON.stringify(bossChallenged));

    localStorage.setItem('savePass', JSON.stringify(savePass));
    localStorage.setItem('passSet', JSON.stringify(passSet));
    //prestige variables
    localStorage.setItem('prestiges', JSON.stringify(prestiges));
    localStorage.setItem('artAmount', JSON.stringify(artAmount));
    localStorage.setItem('shapestone', JSON.stringify(shapestone));
    localStorage.setItem('shapestoneMult', JSON.stringify(shapestoneMult));

    localStorage.setItem('artUnlocked', JSON.stringify(artUnlocked));
    localStorage.setItem('totalArtDmg', JSON.stringify(totalArtDmg));
    localStorage.setItem('artDamages', JSON.stringify(artDamages));

    localStorage.setItem('allDamageMultP', JSON.stringify(allDamageMultP));
    localStorage.setItem('allGoldMultP', JSON.stringify(allGoldMultP));
    localStorage.setItem('clickCritMultP', JSON.stringify(clickCritMultP));
    localStorage.setItem('heroDamageMultP', JSON.stringify(heroDamageMultP));
    //artifacts
    localStorage.setItem('artUnlockCost', JSON.stringify(artUnlockCost));
    localStorage.setItem('artifact1', JSON.stringify(artifact1));
    localStorage.setItem('coreStrengthMult', JSON.stringify(coreStrengthMult));
    localStorage.setItem('artifact2', JSON.stringify(artifact2));
    localStorage.setItem('radiantCubeMult', JSON.stringify(radiantCubeMult));
    localStorage.setItem('artifact3', JSON.stringify(artifact3));
    localStorage.setItem('honedTriMult', JSON.stringify(honedTriMult));
    localStorage.setItem('artifact4', JSON.stringify(artifact4));
    localStorage.setItem('inspDiamMult', JSON.stringify(inspDiamMult));
}
function loadGame() //this load function just loads all of the saved local information for ALL the variables.  This thing gives a crap ton of issues when loading a new version of the game from an old save, so I have several checks
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
        heroDamage = JSON.parse(localStorage.getItem('heroDamage'));
        heroNumber = JSON.parse(localStorage.getItem('heroNumber'));
        if (heroNumber == null){
            heroNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
        console.log(heroNumber);

        damage = JSON.parse(localStorage.getItem('damage'));
        clickDamageMult = JSON.parse(localStorage.getItem('clickDamageMult'));
        clickCritMult = JSON.parse(localStorage.getItem('clickCritMult'));
        clickCritChance = JSON.parse(localStorage.getItem('clickCritChance'));
        clickLevel = JSON.parse(localStorage.getItem('clickLevel'));
        clickUpCost = JSON.parse(localStorage.getItem('clickUpCost'));
        clickUpCost2 = JSON.parse(localStorage.getItem('clickUpCost2'));

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
        //prestige variables
        prestiges = JSON.parse(localStorage.getItem('prestiges'));
        artAmount = JSON.parse(localStorage.getItem('artAmount'));
        shapestone = JSON.parse(localStorage.getItem('shapestone'));
        shapestoneMult = JSON.parse(localStorage.getItem('shapestoneMult'));
        if (shapestoneMult == undefined){
            shapestoneMult = 1;
        }

        allDamageMultP = JSON.parse(localStorage.getItem('allDamageMultP'));
        allGoldMultP = JSON.parse(localStorage.getItem('allGoldMultP'));
        clickCritMultP = JSON.parse(localStorage.getItem('clickCritMultP'));

        artUnlocked = JSON.parse(localStorage.getItem('artUnlocked'));
        if (artUnlocked == undefined){
            artUnlocked = [true, false, false, false, false];
        }
        totalArtDmg = JSON.parse(localStorage.getItem('totalArtDmg'));
        if (totalArtDmg == undefined){
            totalArtDmg = 0;
        }

        artDamages = JSON.parse(localStorage.getItem('artDamages'));
        if (artDamages == undefined){
            artDamages = [0, 0, 0, 0, 0];
        }

        h1M = JSON.parse(localStorage.getItem('h1M'));
        h2M = JSON.parse(localStorage.getItem('h2M'));
        h3M = JSON.parse(localStorage.getItem('h3M'));
        h4M = JSON.parse(localStorage.getItem('h4M'));
        if (h4M == null)    // for users playing before this got added
        {
            h4M = [true, false, false, false, false, false, false, false, false, false];
        }

        //changing the click damage multiplier to be an array
        if (clickDamageMult.length == undefined)
        {
            clickDamageMult = [0, clickDamageMult, 1];
        }
        if (damage.length == undefined)
        {
            damage = [0, damage, (5e0 * allDamageMult)];
        }
        if (clickUpCost2 == undefined)
        {
            clickUpCost2 = 5;
        }
        if (clickLevel.length == undefined)
        {
            clickLevel = [0, clickLevel, 1];
        }

        allHeroDmg = JSON.parse(localStorage.getItem('allHeroDmg'));
        heroClickMult = JSON.parse(localStorage.getItem('heroClickMult'));
        trueDamage = JSON.parse(localStorage.getItem('trueDamage'));

        bossChallenged = JSON.parse(localStorage.getItem('bossChallenged'));
        if (boss == true)   // resetting to the stage before a boss if the user saved during a boss
        {
            boss = false;
            stageProgress = 5;
            bossChallenged = true;
            time = bossTimerCount;
            document.getElementById('bossButton').addEventListener('click', fightBoss);
            document.getElementById('bossButton').innerHTML = 'Fight Boss';
        }
        savePass = JSON.parse(localStorage.getItem('savePass'));
        passSet = JSON.parse(localStorage.getItem('passSet'));


        /* --- */
        /* checking if things are unlocked or not */
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
        if (heroBought[10] == true)
        {
            clearInterval(heroAtk[10]);
            heroAtk[10] = setInterval(heroAttack10, heroAtkCooldown[10]*1000);
            document.getElementById("hero10Locked").innerHTML = "Upgrade";
        }
        if (heroBought[11] == true)
        {
            clearInterval(heroAtk[11]);
            heroAtk[11] = setInterval(heroAttack11, heroAtkCooldown[11]*1000);
            document.getElementById("hero11Locked").innerHTML = "Upgrade";
        }
        if (heroBought[12] == true)
        {
            clearInterval(heroAtk[12]);
            heroAtk[12] = setInterval(heroAttack12, heroAtkCooldown[12]*1000);
            document.getElementById("hero12Locked").innerHTML = "Upgrade";
        }

        //artifacts
        checkArtifactUpdate();
        
        artUnlockCost = JSON.parse(localStorage.getItem('artUnlockCost'));
        if (artUnlockCost == undefined){
            artUnlockCost = Math.floor((artAmount + 1) * 1.35**(artAmount + 1));
        }
        artifact1 = JSON.parse(localStorage.getItem('artifact1'));
        coreStrengthMult = JSON.parse(localStorage.getItem('coreStrengthMult'));
        if (coreStrengthMult == undefined){
            coreStrengthMult = 1;
        }
        if (artUnlocked[1] == true){
            resetArtUpgradeButton();
            document.getElementById("artifact1").classList.add("shown");
            document.getElementById("artifact1").classList.remove("hidden");
        }

        artifact2 = JSON.parse(localStorage.getItem('artifact2'));
        radiantCubeMult = JSON.parse(localStorage.getItem('radiantCubeMult'));
        if (radiantCubeMult == undefined){
            radiantCubeMult = 1;
        }
        if (artUnlocked[2] == true){
            resetArtUpgradeButton();
            document.getElementById("artifact2").classList.add("shown");
            document.getElementById("artifact2").classList.remove("hidden");
        }

        artifact3 = JSON.parse(localStorage.getItem('artifact3'));
        honedTriMult = JSON.parse(localStorage.getItem('honedTriMult'));
        if (honedTriMult == undefined){
            honedTriMult = 1;
        }
        if (artUnlocked[3] == true){
            resetArtUpgradeButton();
            document.getElementById("artifact3").classList.add("shown");
            document.getElementById("artifact3").classList.remove("hidden");
        }

        artifact4 = JSON.parse(localStorage.getItem('artifact4'));
        inspDiamMult = JSON.parse(localStorage.getItem('inspDiamMult'));
        if (inspDiamMult == undefined){
            inspDiamMult = 1;
        }
        if (artUnlocked[4] == true){
            resetArtUpgradeButton();
            document.getElementById("artifact4").classList.add("shown");
            document.getElementById("artifact4").classList.remove("hidden");
        }
        console.log(heroNumber);
        checkHeroUpdate();
    }
}
function checkHeroUpdate()
{
    console.log("comparing hero amount");
    if (heroNumber.length != heroNumberU.length)
    {
        j = heroNumberU.length - heroNumber.length;
        console.log(j);
        for (i = j; i > 0; i--)
        {
            var k = heroNumberU.length - i;
            heroNumber.push(k);
            console.log(k);

            if (heroNumber[k] == 10)
            {
                heroAtkCooldown.push(3);
                hCost.push(1.75e15);
                hCostBase.push(1.75e15);
                let z = (hCost[10] * 5 * heroAtkCooldown[10]) / 4 * ((1-23/1000*min(heroNumber[10], heroNumber.length))**min(heroNumber[10],heroNumber.length));
                heroDamage.push(z);
                heroBaseDamage.push(z);
                heroAtk.push('filler');
                hDmgMult.push(1);
                heroLvl.push(0);
                heroBought.push(false);
                heroUnlocked.push(false);
                indHeroDmg.push = 0;
            }
            if (heroNumber[k] == 11)
            {
                heroAtkCooldown.push(4);
                hCost.push(4.00e17);
                hCostBase.push(4.00e17);
                let z = (hCost[11] * 5 * heroAtkCooldown[11]) / 4 * ((1-23/1000*min(heroNumber[11], heroNumber.length))**min(heroNumber[11],heroNumber.length));
                heroDamage.push(z);
                heroBaseDamage.push(z);
                heroAtk.push('filler');
                hDmgMult.push(1);
                heroLvl.push(0);
                heroBought.push(false);
                heroUnlocked.push(false);
                indHeroDmg.push = 0;
            }
            if (heroNumber[k] == 12)
            {
                heroAtkCooldown.push(2.25);
                hCost.push(9.57e19);
                hCostBase.push(9.57e19);
                let z = (hCost[12] * 5 * heroAtkCooldown[12]) / 4 * ((1-23/1000*min(heroNumber[12], heroNumber.length))**min(heroNumber[12],heroNumber.length));
                heroDamage.push(z);
                heroBaseDamage.push(z);
                heroAtk.push('filler');
                hDmgMult.push(1);
                heroLvl.push(0);
                heroBought.push(false);
                heroUnlocked.push(false);
                indHeroDmg.push = 0;
            }
        }
    }
}
function checkArtifactUpdate()
{
    if (artUnlocked.length != artUnlockedT.length)
    {
        var j = artUnlockedT.length - artUnlocked.length;
        for (k = 0; k < j; k++)
        {
            artUnlocked.push(false);
            artDamages.push(0);
        }
    }
}

/* -------------------------------------------- */
// admin
// these are all 'admin' commands just for testing purposes
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
        health = ((100 * (1.39**(min(stage, 120)) * (1.13 **(max((stage - 120), 0))))) * (Math.random() * 0.2 + 0.9));
        maxHealth = health;
        stageProgress = 1;
    }
    else 
    {
        alert("Nope Denied");
    }
    
}
function shapestoneSpawn()
{
    let adminCode = prompt("Admin Passcode");
    if (adminCode == hacks)
    {
        let shapestoneAmount1 = prompt("Base value of shapestone [(x) * 10 ** y]");
        let shapestoneAmount2 = prompt("Amount of zeroes in shapestone value [x * 10 ** (y)]");
        parseInt(shapestoneAmount1);
        parseInt(shapestoneAmount2);
        shapestone = shapestoneAmount1 * 10 ** shapestoneAmount2
    }
    else 
    {
        alert("Nope Denied");
    }
    
}

function testDisplay(){
    console.log(artDamages);
    totalArtifactDamage();
    console.log(artifact1);
    console.log(artifact2);
    console.log(artifact3);
    console.log(artifact4);
}

var faust = setInterval(displayStats, 10);


