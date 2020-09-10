---
title: "Gabe MZ | Message Plus"
author: "Gabriel"
date: "10/09/20"
---

# Gabe MZ - Message Plus

`10/09/20 | Version: 0.0.5 | Under development`

***

This plugin adds improvements to the standard message system of RPG Maker MZ.

***

## Escape Commands:
Below is a list of the new escape commands that can be used within messages:

### Message Control:
```js
\color[colorName]           // Change the color of the text with the Custom Color defined in this Plugin Parameters.
                            //    colorName: The color name

\face[faceName, faceIndex]  // Change the current message face to the specified face.
                            //    faceName:  The face filename
                            //    faceIndex: The face index

\actorFace[id]              // Change the current message face to the face of the specified id actor.
                            //    id: The actor id
```

### Data Info: Actors Parameters:
```js
\ahp[id]                    // Displays the HP of the specified id actor.
\amhp[id]                   // Displays the Max HP of the specified id actor.
\amp[id]                    // Displays the MP of the specified id actor.
\ammp[id]                   // Displays the Max MP of the specified id actor.
\aatk[id]                   // Displays the attack of the specified id actor.
\adef[id]                   // Displays the defense of the specified id actor.
\amatk[id]                  // Displays the magic attack of the specified id actor.
\amdef[id]                  // Displays the magic defense of the specified id actor.
\aagi[id]                   // Displays the agility of the specified id actor.
\aluk[id]                   // Displays the luck of the specified id actor.
                            //    id: The actor id
```

### Data Info: Enemies Parameters:
```js
\emhp[id]                   // Displays the Max HP of the specified id enemy.
\emmp[id]                   // Displays the Max MP of the specified id enemy
\eatk[id]                   // Displays the attack of the specified id enemy.
\edef[id]                   // Displays the defense of the specified id enemy.
\ematk[id]                  // Displays the magic attack of the specified id enemy.
\emdef[id]                  // Displays the magic defense of the specified id enemy.
\eagi[id]                   // Displays the agility of the specified id enemy.
\eluk[id]                   // Displays the luck of the specified id enemy.
                            //    id: The enemy id
```

### Data Info: Items:
```js
// Items
\itn[id]                    // Displays the name of the specified id item.
\iti[id]                    // Displays the icon of the specified id item.
\itq[id]                    // Displays the current party quantity of the specified id item.
                            //    id: The item id

// Weapons
\wpn[id]                    // Displays the name of the specified id weapon.
\wpi[id]                    // Displays the icon of the specified id weapon.
\wpq[id]                    // Displays the current party quantity of the specified id weapon.
                            //    id: The weapon id

// Armors
\arn[id]                    // Displays the name of the specified id armor.
\ari[id]                    // Displays the icon of the specified id armor.
\arq[id]                    // Displays the current party quantity of the specified id armor.
                            //    id: The armor id

// Skills
\skn[id]                    // Displays the name of the specified id skill.
\ski[id]                    // Displays the icon of the specified id skill.
                            //    id: The skill id
```

### Other Commands:
```js
\snp[id]                    // Displays the Text Snippet defined in this Plugin Parameters.
                            //    id: The text snippet id
```
