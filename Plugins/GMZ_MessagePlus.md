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
```
\clr[colorIndex]            // Change the color of the text with the Color Picker defined in this Plugin Parameters.
                            //    colorIndex: The color index
\olc[colorIndex]            // Change the outline color of the text with the Color Picker defined in this Plugin 
                            // Parameters.  
                            //    colorIndex: The color index   
\olw[value]                 // Change the text outline width.
                            //    value: The outrline width       

\fc[faceName, faceIndex]    // Change the current message face to the specified face.
                            //    faceName:  The face filename
                            //    faceIndex: The face index
\actfc[actorId]             // Change the current message face to the specified actor face.
                            //    actorId:  The actor index
\prtfc[value]               // Change the current message face to the actor face of the specified party position.
                            //    value:  The party position

\b[state]                   // Displays the following text with bold.
                            //    state:  The bold state
                            //    1 - Enable bold | 0 - Disable bold
\it[state]                  // Displays the following text with italic.
                            //    state:  The italic state
                            //    1 - Enable italic | 0 - Disable italic


\sfx[state]                 // Control the message sound effect.
                            //    state:  The SFX state
                            //    on - Enable SFX | off - Disable SFX
\sfx[id]                    // Change the current message sound effect.
                            //    id:  The SFX index
 
\isf[state]                 // Control the input show fast.
                            //    state:  The input show fast state
                            //    on - Enable ISF | off - Disable ISF
```

### Data Info: Items:
```
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

### Balloon Mode Commands:
```
\tgt[this]                  // Change the target of the message balloon to the current event.

\tgt[id]                    // Change the target of the message balloon.
                            //    id: The target id
                            //    0   - player
                            //    1 > - event

\tgt[pPos]                  // Change the target of the message balloon to the actor of the specified 
                            // party position. If you're using the Akea Animated Battle System plugin 
                            // it will also work during battles,
                            //    Pos: The party position

\tgt[aId]                   // Change the target of the message balloon to the specified actor id. If 
                            // you're using the Akea Animated Battle System plugin it will also work 
                            // during battles,
                            //    Id: The actor index

\tgt[eId]                   // Change the target of the message balloon to the specified battle target 
                            // id. Only works if you are using the Akea Animated Battle System plugin.
                            //    Id: The battle target index

\spp                        // Show the balloon pop.

\hpp                        // Hide the ballon pop.
```
