import assert from 'node:assert/strict';
const escaped=value=>value.replace(/[&<>]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]));
export function assertShellPrivacy(html,{area,approvedMembers=[]}) {
  assert.doesNotMatch(html,/signInWithPopup|members\//);
  let inspected=html;
  if(area==='public'){
    const cards=Array.from(html.matchAll(/<article\b[^>]*\bdata-public-member(?:="[^"]*")?[^>]*>[\s\S]*?<\/article>/g),match=>match[0]);
    assert.equal(cards.length,approvedMembers.length,'Public member cards require matching explicit editorial entries');
    for(const [index,card] of cards.entries()){
      const member=approvedMembers[index],name=`<h3>${escaped(member.name)}</h3>`,role=`<p class="member-role">${escaped(member.role)}</p>`;
      assert.ok(card.includes(name)&&card.includes(role),'Public names and roles must match approved editorial content');
      let verified=card.replace(name,'<h3></h3>').replace(role,'<p class="member-role"></p>');
      if(member.description){const description=`<p>${escaped(member.description)}</p>`;assert.ok(card.includes(description),'Public descriptions must match approved editorial content');verified=verified.replace(description,'<p></p>');}
      if(member.image){const label=`alt="${escaped(member.image.label).replaceAll('"','&quot;')}"`;assert.ok(card.includes(label),'Public image labels must match approved editorial content');verified=verified.replace(label,'alt=""');}
      // Exempt exact approved fields only; unexpected identities remain forbidden.
      inspected=inspected.replace(card,verified);
    }
  }
  assert.doesNotMatch(inspected,/Guille|Juan|Will|Pablo/);
}
