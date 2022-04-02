const toneMap = {
  "/j":"joking",
  "/hj":"half joking",
  "/s":"sarcastic / sarcasm",
  "/sarc":"sarcastic / sarcasm",
  "/srs":"serious",
  "/nsrs":"not serious",
  "/lh":"light hearted",
  "/g":"genuine / genuine question",
  "/gen":"genuine / genuine question",
  "/ij":"inside joke",
  "/ref":"reference",
  "/t":"teasing",
  "/nm":"not mad",
  "/lu":"a little upset",
  "/nf":"not forced",
  "/nbh":"nobody here",
  "/nsb":"not subtweeting",
  "/nay":"not at you",
  "/ay":"at you",
  "/nbr":"not being rude",
  "/ot":"off topic",
  "/th":"threat",
  "/cb":"clickbait",
  "/f":"fake",
  "/q":"quote",
  "/l":"lyrics",
  "/ly":"lyrics",
  "/c":"copypasta",
  "/m":"metaphor / metaphorically",
  "/li":"literal / literally",
  "/rt":"rhetorical question",
  "/rh":"rhetorical question",
  "/hyp":"hyperbole",
  "/p":"platonic",
  "/r":"romantic",
  "/a":"alterous",
  "/sx":"sexual intent",
  "/x":"sexual intent",
  "/nsx":"non-sexual intent",
  "/ns":"non-sexual intent",
  "/pc":"positive connotation",
  "/pos":"positive connotation",
  "/nc":"negative connotation",
  "/neg":"negative connotation",
  "/neu":"neutral / neutral connotation"
}
function onCreated() {}
console.log("loaded");
browser.contextMenus.create({
  id: "tone-indicator",
  title: "Get Tone Indicator Meaning",
  contexts: ["selection"]
}, onCreated);
browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "tone-indicator":
      console.log("item clicked");

      let selectedText = info.selectionText.trim();
      if (selectedText) {
        !selectedText.startsWith("/") ? selectedText = "/" + selectedText : null;
        let toneName = toneMap[selectedText];
        browser.notifications.create({
          "type": "basic",
          "title": "Tone Indicator - " + selectedText,
          "message": "The tone indicator " + selectedText + " means " + toneName
        });
      }
      break;
  }
})


