let hero = {
    health: 100,
    attack: 25,
    defense: 10,
    healCount: 5
};

let enemy = {
    health: 150,
    attack: 20,
    defense: 12
};

let playerTurn = true;

function calculateDamage(attacker, defender, isCrit = false, isMiss = false) {
    if (isMiss) {
        return 0;
    }

    let baseDamage = attacker.attack - defender.defense;
    let randomFactor = Math.floor(Math.random() * 5);
    let damage = baseDamage + randomFactor;

    if (isCrit) {
        damage *= 2;
    }

    return damage > 0 ? damage : 0;
}

function attack() {
    if (!playerTurn) return;
    if (enemy.health <= 0) {
        document.getElementById('message').innerText = 'You already defeated the enemy!';
        return;
    }

    let isMiss = Math.random() < 0.05;
    let isCrit = Math.random() < 0.30;
    let damageToEnemy = calculateDamage(hero, enemy, isCrit, isMiss);

    if (isMiss) {
        document.getElementById('message').innerText = 'You missed your attack!';
    } else if (isCrit) {
        document.getElementById('message').innerText = 'Critical Hit! You deal double damage!';
    }

    enemy.health -= damageToEnemy;

    if (enemy.health <= 0) {
        enemy.health = 0;
        document.getElementById('message').innerText = 'You defeated the enemy!';
        return;
    }

    playerTurn = false;
    setTimeout(enemyTurn, 1000);
    updateStats();
}

function heal() {
    if (!playerTurn) return;
    if (hero.healCount <= 0) {
        document.getElementById('message').innerText = 'You have no more healing potions!';
        return;
    }

    hero.health += 30;

    hero.healCount--;

    playerTurn = false;
    setTimeout(enemyTurn, 1000);
    updateStats();
}

function enemyTurn() {
    let isMiss = Math.random() < 0.05;
    let isCrit = Math.random() < 0.30;
    let damageToHero = calculateDamage(enemy, hero, isCrit, isMiss);

    if (isMiss) {
        document.getElementById('message').innerText = 'Enemy missed their attack!';
    } else if (isCrit) {
        document.getElementById('message').innerText = 'Critical Hit! Enemy deals double damage!';
    }

    hero.health -= damageToHero;

    if (hero.health <= 0) {
        hero.health = 0;
        document.getElementById('message').innerText = 'You were defeated by the enemy!';
        return;
    }

    playerTurn = true;
    document.getElementById('message').innerText = 'It\'s your turn again!';
    updateStats();
}

function updateStats() {
    document.getElementById('hero-health').innerText = hero.health;
    document.getElementById('enemy-health').innerText = enemy.health;
}

function resetGame() {
    hero = {
        health: 100,
        attack: 25,
        defense: 10,
        healCount: 5
    };

    enemy = {
        health: 150,
        attack: 20,
        defense: 12
    };

    playerTurn = true;
    document.getElementById('message').innerText = 'It\'s your turn!';
    updateStats();
}
