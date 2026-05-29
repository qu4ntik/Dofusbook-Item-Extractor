// ============================================================
//  DOFUSBOOK - Extracteur d'items dans l'ordre des slots
//  Usage : coller dans la console du navigateur (F12)
//          sur n'importe quelle page d-bk.net/fr/d/XXXXX
// ============================================================

(function () {
  // Récupère toutes les images d'items (classe spécifique aux icônes d'équipement)
  const imgs = [...document.querySelectorAll('img[alt]')].filter(img => {
    const c = img.className || '';
    return c.includes('size-12.5') || c.includes('size-16.5') || c.includes('size-17.5');
  });

  if (imgs.length === 0) {
    console.warn('⚠️ Aucun item trouvé. Vérifie que tu es bien sur une page de stuff Dofusbook.');
    return;
  }

  // Ordre de réindexation : HTML positions → Slots visuels 1-16
  // (slot 1 = main droite, slot 2 = cape, etc. — ordre croissant affiché à l'écran)
  // Déterminé à partir de la disposition visuelle du personnage :
  //   Colonne droite haut→bas : slots 1, 2, 3, 4, 5  (positions HTML : 7,9,5,3,8 → à trier)
  //   Colonne gauche haut→bas : slots 6, 7, 8, 9, 10 (positions HTML : 6,1,4,2,10)
  //   Ligne du bas gauche→droite : slots 11 à 16     (positions HTML : 11,12,13,14,15,16)
  const SLOT_ORDER = [7, 9, 5, 3, 8, 6, 1, 4, 2, 10, 11, 12, 13, 14, 15, 16];
  // Index 0-based
  const reordered = SLOT_ORDER.map(htmlPos => imgs[htmlPos - 1]);

  console.log('%c=== DOFUSBOOK — Items dans l\'ordre des slots ===', 'color: gold; font-weight: bold; font-size: 14px;');
  console.log('');

  const lines = [];
  reordered.forEach((img, i) => {
    const name = img ? img.getAttribute('alt').trim() : '(vide)';
    const line = `${String(i + 1).padStart(2, ' ')}. ${name}`;
    console.log(line);
    lines.push(name);
  });

  // Affiche un panneau flottant dans la page avec le texte prêt à copier
  const text = lines.join('\r\n');

  // Supprime un éventuel panneau précédent
  const old = document.getElementById('dofusbook-extractor');
  if (old) old.remove();

  const panel = document.createElement('div');
  panel.id = 'dofusbook-extractor';
  panel.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 999999;
    background: #1a1a2e; border: 2px solid gold; border-radius: 10px;
    padding: 16px; width: 280px; font-family: sans-serif; box-shadow: 0 4px 20px rgba(0,0,0,0.7);
  `;

  panel.innerHTML = `
    <div style="color: gold; font-weight: bold; font-size: 14px; margin-bottom: 8px;">
      ⚔️ Dofusbook — Items extraits
    </div>
    <div style="color: #aaa; font-size: 11px; margin-bottom: 8px;">
      Fais <b style="color:white">Ctrl+A</b> dans la zone puis <b style="color:white">Ctrl+C</b>,<br>
      ensuite colle dans Excel avec <b style="color:white">Ctrl+V</b> (1 clic sur la cellule).
    </div>
    <textarea id="dofusbook-text" style="
      width: 100%; height: 220px; background: #0d0d1a; color: #00ff99;
      border: 1px solid #444; border-radius: 6px; padding: 8px;
      font-size: 12px; resize: none; box-sizing: border-box;
    ">${text}</textarea>
    <button onclick="document.getElementById('dofusbook-extractor').remove()" style="
      margin-top: 8px; width: 100%; background: #333; color: #ccc;
      border: 1px solid #555; border-radius: 6px; padding: 6px; cursor: pointer;
    ">✖ Fermer</button>
  `;

  document.body.appendChild(panel);

  // Sélectionne automatiquement le texte dans la zone
  const ta = document.getElementById('dofusbook-text');
  ta.focus();
  ta.select();

  console.log('%c✅ Panneau ouvert en haut à droite de la page ! Ctrl+A → Ctrl+C → colle dans Excel.', 'color: lightgreen; font-weight: bold;');
})();
