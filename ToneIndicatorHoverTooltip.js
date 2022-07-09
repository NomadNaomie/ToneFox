let toneMap = [
    { "tag": ["/j", "joking"], "colors": ["#BFFCC6", "#0d7a1a"] },
    { "tag": ["/hj", "half joking"], "colors": ["#D8FFD6", "#0d7a1a"] },
    { "tag": ["/srs", "serious"], "colors": ["#6EB5FF", "#29629e"] },
    { "tag": ["/nsrs", "not serious"], "colors": ["#F6A6FF", "#a639b3"] },
    { "tag": ["/lh", "light hearted"], "colors": ["#ACE6FF", "#217ca3"] },
    { "tag": ["/ij", "inside joke"], "colors": ["#E7FFAC", "#6d9114"] },
    { "tag": ["/ref", "reference"], "colors": ["#AFCBFF", "#144091"] },
    { "tag": ["/t", "teasing"], "colors": ["#FFFFD1", "##c7c710"] },
    { "tag": ["/nm", "not mad"], "colors": ["#DCD3FF", "#3d1bc2"] },
    { "tag": ["/lu", "a little upset"], "colors": ["#FFF5BA", "#8f7c0b"] },
    { "tag": ["/nf", "not forced"], "colors": ["#DEFDE0", "#089611"] },
    { "tag": ["/nbh", "nobody here"], "colors": ["#FCF7DE", "#7a6600"] },
    { "tag": ["/nsb", "not subtweeting"], "colors": ["#DEF3FD", "#00405e"] },
    { "tag": ["/nay", "not at you"], "colors": ["#F0DEFD", "#7a02d1"] },
    { "tag": ["/nav", "not a vent"], "colors": ["#00cc99", "#0aAB31"] },
    { "tag": ["/ay", "at you"], "colors": ["#FDDFDF", "#8c0707"] },
    { "tag": ["/nbr", "not being rude"], "colors": ["#9ADBB3", "#048a38"] },
    { "tag": ["/ot", "off-topic"], "colors": ["#E7FFAC", "#476108"] },
    { "tag": ["/th", "threat"], "colors": ["#FFABAB", "#b50e0e"] },
    { "tag": ["/cb", "clickbait"], "colors": ["#F3FFE3", "#569106"] },
    { "tag": ["/f", "fake"], "colors": ["#85E3FF", "#066480"] },
    { "tag": ["/c", "copypasta"], "colors": ["#DBFFD6", "#1f8c0f"] },
    { "tag": ["/m", "metaphor / metaphorically"], "colors": ["#FBE4FF", "#750987"] },
    { "tag": ["/li", "literal / literally"], "colors": ["#BED2FE", "#0a328a"] },
    { "tag": ["/hyp", "hyperbole"], "colors": ["#F6F9FF", "#2a3c5e"] },
    { "tag": ["/p", "platonic"], "colors": ["#B5CCFE", "#2260e6"] },
    { "tag": ["/r", "romantic"], "colors": ["#FFCCF9", "#bf19ac"] },
    { "tag": ["/a", "alterous"], "colors": ["#C7D9FE", "#1458e3"] },
    { "tag": ["/neu", "neutral / neutral connotation"], "colors": ["#E3ECFF", "#315ab0"] },
    { "tag": ["/g", "/gen", "/genq", "genuine / genuine question"], "colors": ["#AFF8D8", "#089c5b"] },
    { "tag": ["/s", "/sarc", "sarcastic / sarcasm"], "colors": ["#FFCBC1", "#cf3d21"] },
    { "tag": ["/l", "/ly", "lyrics"], "colors": ["#97A2FF", "#0e1873"] },
    { "tag": ["/rt", "/rh", "rhetorical question"], "colors": ["#A79AFF", "#1c099c"] },
    { "tag": ["/sx", "/x", "sexual intent"], "colors": ["#FF9CEE", "#780b65"] },
    { "tag": ["/nsx", "/ns", "/nx", "non-sexual intent"], "colors": ["#FFBEBC", "#7a201d"] },
    { "tag": ["/pc", "/pos", "positive connotation"], "colors": ["#84D3B2", "#0e9e62"] },
    { "tag": ["/nc", "/neg", "negative connotation"], "colors": ["#FFCCBB", "#87452f"] }
].map(v => { let desc = v.tag.pop(); return [v.tag, desc, v.colors] })

function replace(text) {
    let words = text.matchAll(new RegExp('\\/[a-z]{1,4}\\b', 'gm'))
    for (let word of words) {
        toneMap.forEach(function (tone) {
            if (tone[0].includes(word[0])) {
                let span = document.createElement('span');
                span.style.backgroundColor = tone[2][0];
                span.style.color = tone[2][1];
                span.title = tone[1];
                span.innerHTML = word[0];
                text = text.replaceAll(new RegExp(word[0] + '\\b', 'g'), span.outerHTML);
            }
        });
    }
    return text;
}

/**
 * The following code was taken and modified under GPLv3 from FoxReplace
 * https://github.com/Woundorf/foxreplace
 * The License can be found at
 * https://github.com/Woundorf/foxreplace/blob/master/COPYING
 */


let textNodesXpath = "/html/head/title/text()"
    + "|/html/body//text()[not(parent::script)]";
let textNodes = document.evaluate(textNodesXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
let nTextNodes = textNodes.snapshotLength;
for (let i = 0; i < nTextNodes; i++) {
    let textNode = textNodes.snapshotItem(i);
    let originalText = textNode.textContent;
    let replacedText = replace(originalText);
    if (originalText != replacedText) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(replacedText, "text/html");
        let fragment = document.createDocumentFragment();
        let child = doc.body.firstChild;
        while (child) {
            fragment.appendChild(child);
            child = doc.body.firstChild;
        }
        let parent = textNode.parentNode;
        parent.replaceChild(fragment, textNode);
        if (parent.localName == "textarea" && parent.value == parent.defaultValue) {
            let event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, false);
            parent.dispatchEvent(event);
        }
    }
}
