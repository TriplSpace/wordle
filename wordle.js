// get references to canvas and drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// wordlist
// this is massive. I am sorry.
const wordList = ["aback", "abase", "abate", "abaya", "abbey", "abbot", "abets", "abhor", "abide", "abode", "abort", "about", "above", "abuse", "abuts", "abyss", "ached", "aches", "acids", "acing", "ackee", "acorn", "acres", "acrid", "acted", "actin", "actor", "acute", "adage", "adapt", "added", "adder", "addle", "adept", "adieu", "adios", "adits", "adman", "admin", "admit", "adobe", "adobo", "adopt", "adore", "adorn", "adult", "adzes", "aegis", "aeons", "aerie", "affix", "afire", "afoot", "afore", "after", "again", "agape", "agate", "agave", "agent", "aggro", "agile", "aging", "aglow", "agony", "agora", "agree", "ahead", "ahold", "aided", "aider", "aides", "ailed", "aimed", "aimer", "aioli", "aired", "aisle", "alarm", "album", "alder", "aleph", "alert", "algae", "algal", "alias", "alibi", "alien", "align", "alike", "alive", "alkyd", "alkyl", "allay", "alley", "allot", "allow", "alloy", "allyl", "aloes", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha", "altar", "alter", "altos", "alums", "amass", "amaze", "amber", "ambit", "amble", "ambos", "amend", "amide", "amine", "amino", "amiss", "amity", "amnio", "among", "amour", "amped", "ample", "amply", "amuse", "ancho", "angel", "anger", "angle", "angry", "angst", "anima", "anime", "anion", "anise", "ankle", "annas", "annex", "annoy", "annul", "anode", "anole", "antic", "antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "apnea", "apple", "apply", "apron", "apses", "apter", "aptly", "aquas", "arbor", "ardor", "areal", "areas", "areca", "arena", "argon", "argot", "argue", "argus", "arias", "arils", "arise", "armed", "armor", "aroma", "arose", "array", "arrow", "arses", "arson", "artsy", "asana", "ascot", "ashen", "ashes", "aside", "asked", "asker", "askew", "aspen", "aspic", "assay", "asses", "asset", "aster", "astir", "asura", "atlas", "atman", "atoll", "atoms", "atone", "atopy", "attic", "audio", "audit", "auger", "aught", "augur", "aunts", "aunty", "aural", "auras", "autos", "auxin", "avail", "avers", "avert", "avian", "avoid", "avows", "await", "awake", "award", "aware", "awash", "awful", "awoke", "axels", "axial", "axils", "axing", "axiom", "axion", "axles", "axons", "azide", "azole", "azure", "babel", "babes", "babka", "backs", "bacon", "baddy", "badge", "badly", "bagel", "baggy", "bails", "bairn", "baits", "baize", "baked", "baker", "bakes", "baldy", "baled", "baler", "bales", "balks", "balky", "balls", "balms", "balmy", "balsa", "banal", "bands", "bandy", "banes", "bangs", "banjo", "banks", "barbs", "bards", "bared", "barer", "bares", "barge", "barks", "barmy", "barns", "baron", "barre", "basal", "based", "baser", "bases", "basic", "basil", "basin", "basis", "basks", "basso", "bassy", "baste", "batch", "bated", "bathe", "baths", "batik", "baton", "batts", "batty", "bawdy", "bawls", "bayed", "bayou", "beach", "beads", "beady", "beaks", "beams", "beamy", "beans", "beard", "bears", "beast", "beats", "beaus", "beaut", "beaux", "bebop", "becks", "beech", "beefs", "beefy", "beeps", "beers", "beery", "beets", "befit", "began", "beget", "begin", "begun", "beige", "being", "belay", "belch", "belie", "belle", "bells", "belly", "below", "belts", "bench", "bends", "bendy", "bento", "bents", "beret", "bergs", "berms", "berry", "berth", "beryl", "beset", "bests", "betas", "betel", "betta", "bevel", "bezel", "bhaji", "bible", "bicep", "biddy", "bided", "bides", "bidet", "bight", "bigot", "bijou", "biked", "biker", "bikes", "biles", "bilge", "bills", "billy", "bimbo", "bindi", "binds", "binge", "bingo", "biome", "biota", "bipod", "birch", "birds", "birth", "bison", "bitch", "biter", "bites", "bitsy", "bitty", "black", "blade", "blame", "bland", "blank", "blare", "blase", "blast", "blaze", "bleak", "bleat", "blebs", "bleed", "bleep", "blend", "bless", "blimp", "blind", "bling", "blini", "blink", "blips", "bliss", "blitz", "bloat", "blobs", "block", "blocs", "blogs", "bloke", "blond", "blood", "bloom", "bloop", "blots", "blown", "blows", "blued", "blues", "bluey", "bluff", "blunt", "blurb", "blurs", "blurt", "blush", "board", "boars", "boast", "boats", "bobby", "bocce", "boche", "boded", "bodes", "boffo", "bogey", "boggy", "bogie", "bogus", "boils", "bolas", "boles", "bolls", "bolts", "bolus", "bombe", "bombs", "bonds", "boned", "boner", "bones", "boney", "bongo", "bongs", "bonks", "bonny", "bonus", "boobs", "booby", "booed", "books", "booms", "boomy", "boons", "boors", "boost", "booth", "boots", "booty", "booze", "boozy", "boppy", "borax", "bored", "borer", "bores", "boric", "borne", "boron", "bosom", "boson", "bossy", "bosun", "botch", "bough", "boule", "bound", "bouts", "bowed", "bowel", "bower", "bowls", "boxed", "boxer", "boxes", "boyar", "boyos", "bozos", "brace", "bract", "brads", "brags", "braid", "brain", "brake", "brand", "brans", "brash", "brass", "brats", "brave", "bravo", "brawl", "brawn", "brays", "braze", "bread", "break", "bream", "breed", "brews", "briar", "bribe", "brick", "bride", "brief", "brier", "brigs", "brims", "brine", "bring", "brink", "briny", "brisk", "brits", "broad", "broch", "broil", "broke", "brome", "bronc", "brood", "brook", "broom", "broth", "brown", "brows", "bruin", "bruit", "brunt", "brush", "brute", "bubba", "bucks", "buddy", "budge", "buffs", "buggy", "bugle", "build", "built", "bulbs", "bulge", "bulks", "bulky", "bulla", "bulls", "bully", "bumps", "bumpy", "bunch", "bunds", "bundt", "bunks", "bunny", "bunts", "buoys", "burbs", "burgs", "burka", "burly", "burns", "burnt", "burps", "burqa", "burro", "burrs", "bursa", "burst", "bused", "buses", "bushy", "busts", "busty", "butch", "butte", "butts", "buxom", "buyer", "buzzy", "bylaw", "byres", "bytes", "byway", "cabal", "cabby", "caber", "cabin", "cable", "cacao", "cache", "cacti", "caddy", "cadet", "cadre", "cafes", "caged", "cages", "cagey", "cairn", "caked", "cakes", "cakey", "calfs", "calif", "calla", "calls", "calms", "calve", "calyx", "camel", "cameo", "campo", "camps", "campy", "canal", "candy", "caned", "canes", "canid", "canna", "canny", "canoe", "canon", "canto", "caped", "caper", "capes", "capon", "capos", "caput", "carat", "carbo", "carbs", "cards", "cared", "carer", "cares", "cargo", "carob", "carol", "carom", "carps", "carry", "carte", "carts", "carve", "cased", "cases", "casks", "caste", "casts", "catch", "cater", "catty", "caulk", "cause", "caved", "caver", "caves", "cavil", "cease", "cecal", "cecum", "cedar", "ceded", "cedes", "ceili", "celeb", "cello", "cells", "celts", "cents", "chads", "chafe", "chaff", "chain", "chair", "chalk", "champ", "chana", "chant", "chaos", "chaps", "chard", "charm", "chars", "chart", "chase", "chasm", "chats", "cheap", "cheat", "check", "cheek", "cheep", "cheer", "chefs", "chemo", "chert", "chess", "chest", "chews", "chewy", "chica", "chick", "chico", "chide", "chief", "child", "chile", "chili", "chill", "chime", "chimp", "china", "chine", "ching", "chino", "chins", "chips", "chirp", "chits", "chive", "chock", "choir", "choke", "chomp", "chops", "chord", "chore", "chose", "chows", "chubs", "chuck", "chuff", "chugs", "chump", "chums", "chunk", "churn", "chute", "cider", "cigar", "cinch", "circa", "cisco", "cited", "cites", "civet", "civic", "civil", "civvy", "clack", "clade", "claim", "clamp", "clams", "clang", "clank", "clans", "claps", "clash", "clasp", "class", "clave", "claws", "clays", "clean", "clear", "cleat", "clefs", "cleft", "clerk", "click", "cliff", "climb", "clime", "cline", "cling", "clink", "clips", "cloak", "clock", "clods", "clogs", "clomp", "clone", "close", "cloth", "clots", "cloud", "clout", "clove", "clown", "clubs", "cluck", "clued", "clues", "clump", "clung", "clunk", "coach", "coals", "coast", "coati", "coats", "cobia", "cobra", "cocci", "cocks", "cocky", "cocoa", "codas", "codec", "coded", "coder", "codes", "codex", "codon", "coeds", "cohos", "coifs", "coils", "coins", "cokes", "colas", "colds", "coles", "colic", "colin", "colon", "color", "colts", "comas", "combo", "combs", "comer", "comes", "comet", "comfy", "comic", "comma", "commo", "compo", "comps", "comte", "conch", "condo", "coned", "cones", "conga", "congo", "conic", "conks", "cooed", "cooks", "cools", "coops", "coopt", "coped", "copes", "copra", "copse", "coral", "cords", "cored", "corer", "cores", "corgi", "corks", "corky", "corms", "corns", "cornu", "corny", "corps", "costs", "cotta", "couch", "cough", "could", "count", "coupe", "coups", "court", "coven", "cover", "coves", "covet", "covey", "cowed", "cower", "cowls", "coyly", "crabs", "crack", "craft", "crags", "cramp", "crams", "crane", "crank", "crape", "craps", "crash", "crass", "crate", "crave", "crawl", "craws", "craze", "crazy", "creak", "cream", "credo", "creed", "creek", "creel", "creep", "creme", "crepe", "crept", "cress", "crest", "crews", "cribs", "crick", "cried", "crier", "cries", "crime", "crimp", "crisp", "crits", "croak", "crock", "crocs", "croft", "crone", "crony", "crook", "croon", "crops", "cross", "croup", "crowd", "crown", "crows", "crude", "cruel", "cruet", "crumb", "cruse", "crush", "crust", "crypt", "cubby", "cubed", "cubes", "cubic", "cubit", "cuddy", "cuffs", "culls", "culpa", "cults", "cumin", "cupid", "cuppa", "curbs", "curds", "cured", "cures", "curia", "curio", "curls", "curly", "curry", "curse", "curve", "curvy", "cushy", "cusps", "cuter", "cutie", "cutis", "cutup", "cycad", "cycle", "cyclo", "cynic", "cysts", "czars", "dacha", "daddy", "dados", "daffy", "daily", "dairy", "daisy", "dales", "dames", "damns", "damps", "dance", "dandy", "dared", "dares", "darks", "darns", "darts", "dashi", "dated", "dater", "dates", "datum", "daubs", "daunt", "davit", "dawns", "dazed", "deals", "dealt", "deans", "dears", "deary", "death", "debit", "debts", "debug", "debut", "decaf", "decal", "decay", "decks", "decor", "decoy", "decry", "deeds", "deems", "deeps", "deers", "defer", "deify", "deign", "deism", "deist", "deity", "dekes", "delay", "delft", "delis", "dells", "delta", "delve", "demon", "demos", "demur", "denim", "dense", "dents", "depot", "depth", "derby", "desks", "deter", "detox", "deuce", "devil", "dewar", "dhikr", "dhows", "dials", "diary", "diced", "dices", "dicey", "dicky", "dicta", "diets", "digit", "diked", "dikes", "dills", "dilly", "dimer", "dimes", "dimly", "dinar", "dined", "diner", "dines", "dingo", "dings", "dingy", "dinks", "dinky", "dinos", "diode", "dippy", "direr", "dirge", "dirty", "disco", "discs", "dishy", "disks", "ditch", "ditsy", "ditto", "ditty", "ditzy", "divan", "divas", "dived", "diver", "dives", "divot", "divvy", "dizzy", "docks", "dodge", "dodgy", "dodos", "doers", "doffs", "doges", "doggy", "dogma", "doing", "doled", "doles", "dolls", "dolly", "dolor", "dolts", "domed", "domes", "donee", "dongs", "donna", "donor", "donut", "dooms", "doomy", "doors", "doozy", "doped", "dopes", "dopey", "dorks", "dorky", "dorms", "dosas", "dosed", "doses", "doted", "dotes", "dotty", "doubt", "dough", "doula", "douse", "doves", "dowdy", "dowel", "dower", "downs", "downy", "dowry", "dowse", "doyen", "dozed", "dozen", "dozer", "dozes", "drabs", "draft", "drags", "drain", "drake", "drama", "drams", "drank", "drape", "drawl", "drawn", "draws", "drays", "dread", "dream", "dreck", "dregs", "dress", "dribs", "dried", "drier", "dries", "drift", "drill", "drily", "drink", "drips", "drive", "droid", "droll", "drone", "drool", "droop", "drops", "dross", "drove", "drown", "drugs", "druid", "drums", "drunk", "drupe", "dryad", "dryer", "dryly", "duals", "ducal", "ducat", "duchy", "ducks", "ducky", "ducts", "dudes", "duels", "duets", "duffs", "dukes", "dulls", "dully", "dulse", "dumbo", "dummy", "dumps", "dumpy", "dunce", "dunes", "dunks", "duomo", "duped", "dupes", "dural", "durum", "dusks", "dusky", "dusts", "dusty", "dutch", "duvet", "dwarf", "dweeb", "dwell", "dwelt", "dyads", "dyers", "dying", "dykes", "eager", "eagle", "eared", "earls", "early", "earns", "earth", "eased", "easel", "easer", "eases", "eaten", "eater", "eaves", "ebbed", "ebony", "ebook", "echos", "eclat", "edema", "edged", "edger", "edges", "edict", "edify", "edits", "eejit", "eerie", "egged", "egret", "eider", "eidos", "eight", "eject", "ejido", "eland", "elbow", "elder", "elect", "elegy", "elide", "elite", "elope", "elude", "elute", "elven", "elves", "email", "embed", "ember", "emcee", "emery", "emirs", "emits", "emote", "empty", "enact", "ended", "endow", "enema", "enemy", "enjoy", "ennui", "enoki", "enrol", "ensue", "enter", "entry", "envoy", "eosin", "epics", "epoch", "epoxy", "equal", "equip", "erase", "erect", "ergot", "erode", "erred", "error", "erupt", "essay", "ether", "ethic", "ethos", "ethyl", "etude", "euros", "evade", "evens", "event", "every", "evict", "evils", "evoke", "ewers", "exact", "exalt", "exams", "excel", "execs", "exert", "exile", "exist", "exits", "expat", "expel", "expos", "extol", "extra", "exude", "exult", "exurb", "eying", "eyrie", "fable", "faced", "facer", "faces", "facet", "facia", "facts", "faded", "fader", "fades", "faery", "fails", "faint", "fairs", "fairy", "faith", "faked", "faker", "fakes", "fakie", "fakir", "falls", "famed", "fancy", "fangs", "fanny", "farce", "fared", "fares", "farms", "farts", "fasts", "fatal", "fated", "fates", "fatso", "fatty", "fatwa", "fault", "fauna", "fauns", "favas", "faves", "favor", "fawns", "faxed", "faxes", "fazed", "fazes", "fears", "feast", "feats", "fecal", "feces", "feeds", "feels", "feign", "feint", "fella", "fells", "felon", "felts", "femme", "femur", "fence", "fends", "feral", "feria", "ferns", "ferny", "ferry", "fests", "fetal", "fetch", "feted", "fetes", "fetid", "fetus", "feuds", "fever", "fewer", "fiats", "fiber", "fibre", "fiche", "ficus", "fiefs", "field", "fiend", "fiery", "fifes", "fifth", "fifty", "fight", "filch", "filed", "filer", "files", "filet", "fills", "filly", "films", "filmy", "filth", "final", "finca", "finch", "finds", "fined", "finer", "fines", "finis", "finks", "fiord", "fired", "fires", "firms", "first", "fishy", "fists", "fitly", "fiver", "fives", "fixed", "fixer", "fixes", "fizzy", "fjord", "flack", "flags", "flail", "flair", "flake", "flaky", "flame", "flank", "flans", "flaps", "flare", "flash", "flask", "flats", "flaws", "flays", "fleas", "fleck", "flees", "fleet", "flesh", "flick", "flier", "flies", "fling", "float", "flood", "floor", "flour", "flown", "flows", "fluid", "flyer", "focal", "focus", "folks", "fonts", "foods", "force", "forms", "forth", "forty", "forum", "found", "frame", "fraud", "fresh", "fried", "fries", "front", "frost", "fruit", "fuels", "fully", "funds", "funny", "gains", "games", "gamma", "gases", "gates", "gauge", "gears", "genes", "genre", "ghost", "giant", "gifts", "girls", "given", "gives", "gland", "glass", "globe", "glory", "gloss", "glove", "glued", "goals", "goats", "going", "goods", "grace", "grade", "grain", "grams", "grand", "grant", "grape", "graph", "grasp", "grass", "grave", "great", "greek", "green", "greet", "grief", "grill", "grind", "grips", "gross", "group", "grove", "grown", "grows", "guard", "guess", "guest", "guide", "guild", "guilt", "habit", "hairs", "halls", "hands", "handy", "hangs", "happy", "harsh", "hated", "hates", "haven", "hawks", "heads", "heard", "heart", "heavy", "hedge", "heels", "hello", "helps", "hence", "herbs", "highs", "hills", "hints", "hired", "hobby", "holds", "holes", "holly", "homes", "honey", "honor", "hooks", "hoped", "hopes", "horns", "horse", "hosts", "hotel", "hours", "house", "hover", "human", "humor", "hurts", "icons", "ideal", "ideas", "idiot", "image", "imply", "inbox", "incur", "index", "indie", "inner", "input", "intro", "issue", "items", "jeans", "jelly", "jewel", "joins", "joint", "jokes", "judge", "juice", "juicy", "jumps", "keeps", "kicks", "kills", "kinda", "kinds", "kings", "knees", "knife", "knock", "knots", "known", "knows", "label", "labor", "lacks", "lakes", "lamps", "lands", "lanes", "large", "laser", "lasts", "later", "laugh", "layer", "leads", "leaks", "learn", "lease", "least", "leave", "legal", "lemon", "level", "lever", "light", "liked", "likes", "limbs", "limit", "lined", "linen", "liner", "lines", "links", "lions", "lists", "lived", "liver", "lives", "loads", "loans", "lobby", "local", "locks", "lodge", "logic", "logos", "looks", "loops", "loose", "lords", "loses", "loved", "lover", "loves", "lower", "loyal", "lucky", "lunar", "lunch", "lungs", "lying", "macro", "magic", "major", "maker", "makes", "males", "maple", "march", "marks", "marry", "masks", "match", "mates", "maths", "matte", "maybe", "mayor", "meals", "means", "meant", "meats", "medal", "media", "meets", "melee", "menus", "mercy", "merge", "merit", "merry", "messy", "metal", "meter", "metro", "micro", "midst", "might", "miles", "minds", "mines", "minor", "minus", "mixed", "mixer", "mixes", "model", "modem", "modes", "moist", "money", "month", "moral", "motor", "mount", "mouse", "mouth", "moved", "moves", "movie", "music", "myths", "nails", "naked", "named", "names", "nasal", "nasty", "naval", "needs", "nerve", "never", "newer", "newly", "nexus", "nicer", "niche", "night", "ninja", "ninth", "noble", "nodes", "noise", "noisy", "norms", "north", "notch", "noted", "notes", "novel", "nurse", "nylon", "oasis", "occur", "ocean", "offer", "often", "older", "olive", "omega", "onion", "onset", "opens", "opera", "opted", "optic", "orbit", "order", "organ", "other", "ought", "ounce", "outer", "owned", "owner", "oxide", "packs", "pages", "pains", "paint", "pairs", "panel", "panic", "pants", "paper", "parks", "parts", "party", "pasta", "paste", "patch", "paths", "patio", "pause", "peace", "peach", "peaks", "pearl", "pedal", "peers", "penis", "penny", "perks", "pests", "petty", "phase", "phone", "photo", "piano", "picks", "piece", "piles", "pills", "pilot", "pinch", "pipes", "pitch", "pixel", "pizza", "place", "plain", "plane", "plans", "plant", "plate", "plays", "plaza", "plots", "plugs", "poems", "point", "poker", "polar", "poles", "polls", "pools", "porch", "pores", "ports", "posed", "poses", "posts", "pouch", "pound", "power", "press", "price", "pride", "prime", "print", "prior", "prize", "probe", "promo", "prone", "proof", "props", "proud", "prove", "proxy", "psalm", "pulls", "pulse", "pumps", "punch", "pupil", "puppy", "purse", "queen", "query", "quest", "queue", "quick", "quiet", "quilt", "quite", "quote", "races", "racks", "radar", "radio", "rails", "rainy", "raise", "rally", "ranch", "range", "ranks", "rapid", "rated", "rates", "ratio", "razor", "reach", "react", "reads", "ready", "realm", "rebel", "refer", "reign", "relax", "relay", "renal", "renew", "reply", "reset", "resin", "retro", "rider", "rides", "ridge", "rifle", "right", "rigid", "rings", "rinse", "risen", "rises", "risks", "risky", "rival", "river", "roads", "robot", "rocks", "rocky", "rogue", "roles", "rolls", "roman", "rooms", "roots", "ropes", "roses", "rough", "round", "route", "royal", "rugby", "ruins", "ruled", "ruler", "rules", "rural", "sadly", "safer", "salad", "sales", "salon", "sandy", "satin", "sauce", "saved", "saves", "scale", "scalp", "scans", "scare", "scarf", "scary", "scene", "scent", "scoop", "scope", "score", "scout", "scrap", "screw", "seals", "seams", "seats", "seeds", "seeks", "seems", "sells", "sends", "sense", "serum", "serve", "setup", "seven", "sewer", "shade", "shaft", "shake", "shall", "shame", "shape", "share", "shark", "sharp", "sheep", "sheer", "sheet", "shelf", "shell", "shift", "shine", "shiny", "ships", "shirt", "shock", "shoes", "shook", "shoot", "shops", "shore", "short", "shots", "shown", "shows", "sides", "siege", "sight", "sigma", "signs", "silly", "since", "sites", "sixth", "sized", "sizes", "skies", "skill", "skins", "skirt", "skull", "slate", "slave", "sleek", "sleep", "slept", "slice", "slide", "slope", "slots", "small", "smart", "smell", "smile", "smoke", "snack", "snake", "sneak", "socks", "soils", "solar", "solid", "solve", "songs", "sonic", "sorry", "sorts", "souls", "sound", "south", "space", "spare", "spark", "speak", "specs", "speed", "spell", "spend", "spent", "sperm", "spice", "spicy", "spike", "spine", "spite", "split", "spoke", "spoon", "sport", "spots", "spray", "spurs", "squad", "stack", "staff", "stage", "stain", "stake", "stamp", "stand", "stark", "stars", "start", "state", "stats", "stays", "steak", "steal", "steam", "steel", "steep", "steer", "stems", "steps", "stick", "stiff", "still", "stock", "stole", "stone", "stood", "stool", "stops", "store", "storm", "story", "stove", "strap", "straw", "strip", "stuck", "study", "stuff", "style", "sucks", "sugar", "suite", "suits", "sunny", "super", "surge", "sushi", "swear", "sweat", "sweet", "swept", "swift", "swing", "swiss", "sword", "syrup", "table", "taken", "takes", "tales", "talks", "tanks", "tapes", "tasks", "taste", "tasty", "taxes", "teach", "teams", "tears", "teens", "teeth", "tells", "tempo", "tends", "tenth", "tents", "terms", "tests", "texts", "thank", "theft", "their", "theme", "there", "these", "thick", "thief", "thigh", "thing", "think", "third", "those", "three", "threw", "throw", "thumb", "tiger", "tight", "tiles", "timer", "times", "tired", "tires", "title", "toast", "today", "token", "tones", "tools", "tooth", "topic", "torch", "total", "touch", "tough", "tours", "towel", "tower", "towns", "toxic", "trace", "track", "tract", "trade", "trail", "train", "trait", "trans", "traps", "trash", "treat", "trees", "trend", "trial", "tribe", "trick", "tried", "tries", "trips", "trout", "truck", "truly", "trump", "trunk", "trust", "truth", "tubes", "tumor", "tuned", "tunes", "turbo", "turns", "tutor", "tweet", "twice", "twins", "twist", "types", "tyres", "ultra", "uncle", "under", "union", "unite", "units", "unity", "until", "upper", "upset", "urban", "urged", "urine", "usage", "users", "using", "usual", "vague", "valid", "value", "valve", "vapor", "vault", "vegan", "veins", "vents", "venue", "verse", "video", "views", "villa", "vinyl", "viral", "virus", "visas", "visit", "vital", "vivid", "vocal", "vodka", "voice", "volts", "voted", "voter", "votes", "wages", "wagon", "waist", "walks", "walls", "wants", "warns", "waste", "watch", "water", "watts", "waves", "wears", "weeds", "weeks", "weigh", "weird", "wells", "welsh", "whale", "wheat", "wheel", "where", "which", "while", "white", "whole", "whose", "wider", "widow", "width", "winds", "wines", "wings", "wiped", "wired", "wires", "witch", "wives", "woman", "women", "woods", "words", "works", "world", "worms", "worry", "worse", "worst", "worth", "would", "wound", "wrath", "wrist", "write", "wrong", "wrote", "yacht", "yards", "years", "yeast", "yield", "young", "yours", "youth", "yummy", "zones"];
// store basic colors for wordle
const statusColors = {"absent": "#3a3a3c", "present": "#b59f3b", "correct": "#538d4e", "key": "#86888a"};

// register event listener for mouse clicks
canvas.addEventListener("click", mouseClickHandler, false);

// handler for mouse clicks.
function mouseClickHandler(e) {
  // Get the mouse location
  let mX = e.clientX - canvas.offsetLeft;
  let mY = e.clientY - canvas.offsetTop;

  // hold the clicked letter
  let clicked = "";

  // iterate through all the keys in keymap
  for (entry of game.keyboard.keyMap.entries()) {
    // check if click location in the height of current key
    let inHeight = (entry[1].y <= mY) && ((entry[1].y + entry[1].height) >= mY);
    // check if click location in the width of current key
    let inWidth = (entry[1].x <= mX) && ((entry[1].x + entry[1].width) >= mX);

    // if both, set clicked to the entry
    // otherwise clicked will remain an empty string
    if (inHeight && inWidth) {
      clicked = entry[0];
    }
  }
  // call the update function if clicked isn't empty
  if (clicked != "") {
    game.update(clicked);
  }
}

// gridBox object (for the game board)
class gridBox {
  // set up basic aspects of gridBox object
  constructor(x, y, solid = false) {
    this.x = x;
    this.y = y;
    this.ltr = "";
    this.width = 62.0; // All boxes are 62x62
    this.height = 62.0;
    this.isSolid = solid;
    this.status = "absent";
  }

  // draw gridBox
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = statusColors[this.status];
    ctx.fillStyle = statusColors[this.status];
    ctx.stroke();
    if (this.isSolid) ctx.fill();
    if (this.letter != "") {
      ctx.font = "bold 30px Helvetica Neue";
      ctx.fillStyle = "#d7dadc";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.ltr, (this.x + this.width / 2), (this.y + this.height / 2));
    }
    ctx.closePath();
  }
}

// keyBox object (for the keys on the keyboard)
class keyBox {
  // set up basics of keyBox object
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.txt = text;
    this.status = "key";
  }

  // draw keyBox object
  draw() {
    //radius for the arc to create rounded keys
    let radius = 4;
    // Trace rounded box
    ctx.beginPath();
    ctx.moveTo(this.x + radius, this.y);
    ctx.lineTo(this.x + this.width - radius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
    ctx.lineTo(this.x + this.width, this.y + this.height - radius);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height);
    ctx.lineTo(this.x + radius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - radius);
    ctx.lineTo(this.x, this.y + radius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
    // Fill box
    ctx.fillStyle = statusColors[this.status];
    ctx.fill();
    // Add text
    ctx.font = "bold 14px Helvetica Neue";
    ctx.fillStyle = "#d7dadc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.txt, this.x + this.width/2, this.y + this.height/2);
  }
}

// object for the state of game
class gameState {
  constructor(wordList, testing = false) {
    // initialize wordlist to whatever's passed in
    this.wordList = wordList;

    // pick a random target word from the list
    this.target = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
    // print the word to console if we're testing
    if (testing) console.log(this.target);
  }

  // update row based on guess
  check(guess) {
    // we'll return a list of lists of the letters in guess
    // and their new colors
    let newKeyColors = [];

    // keep track of prior seen letters
    let priors = [];

    // for each letter in guess, check if it's in target
    for (let i = 0; i < guess.length; i++) {
      // check where in target guess lies
      if (guess[i] == this.target[i]) {
        // if it's at the same index, correct
        let correct = [guess[i], "correct"];

        // add to priors
        priors.push(guess[i]);

        // add that to newColors
        newKeyColors.push(correct);

      } else if (this.target.includes(guess[i]) && !priors.includes(guess[i])) {
        // otherwise, present
        let present = [guess[i], "present"];

        // add to priors
        priors.push(guess[i]);

        // add that to newColors
        newKeyColors.push(present);

      } else {
        // add guessed letter and "absent" to newColors
        let absent = [guess[i], "absent"];

        // add that to newColors
        newKeyColors.push(absent);

      }
    }

    // send back the new key colors
    return newKeyColors;
  }
}

// grid class to set up and maintain the state of the grid
class grid {
  constructor(rows, cols, word) {
    // basic values
    this.grid = [];
    this.rows = rows;
    this.cols = cols;

    // initialize grid, but don't draw
    let padding = 5;
    // set up the x and y for the top left corner
    let gridX = (canvas.width - (this.cols * 62 + (this.cols - 1) * padding)) / 2;
    let gridY = 50;

    // iterate through every gridBox we need
    // draw it at the right location
    for (let r = 0; r < this.rows; r++) {
        this.grid[r] = [];
        for (let c = 0; c < this.cols; c++) {
            let x = gridX + (c * (62 + padding));
            let y = gridY + (r * (62 + padding));
            this.grid[r][c] = new gridBox(x, y);
      }
    }
  }

  // draw grid
  draw() {
    // for each row
    for(let r = 0; r < this.rows; r++) {
      // for each column
      for(let c = 0; c < this.cols; c++) {
        // call the keyBox there's draw method
        this.grid[r][c].draw();
      }
    }
  }

  // update letter in grid at row, col
  updateLetter(letter, row, col) {
    this.grid[row][col].ltr = letter;
  }

  // update color/status of grid box at row, col
  updateColor(status, row, col) {
    this.grid[row][col].status = status;
  }

  // get the letter at row, col
  getLetter(row, col) {
    return this.grid[row][col].ltr;
  }

  // set solid fill on row, col
  setSolid(row, col) {
    this.grid[row][col].isSolid = true;
  }
}

// keyboard class to set up and maintain the state of the keyboard
class keyboard {
  constructor() {
    // map to hold all of the keys and their state
    this.keyMap = new Map();

    // basic values to locate the keyboard and the keys on the canvas
    let offset = (canvas.width - 484) / 2;
    let hPadding = 6.0;
    let vPadding = 8.0;
    let boardY = canvas.height - 200.0;
    let kWidth = 43.0;
    let kHeight = 58.0;

    // set up row 1 of the keyboard
    let row = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    for (let i = 0; i < 10; i++) {
        let kX = i * (kWidth + hPadding) + offset;
        let kY = boardY;
        this.keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
    }
    
    // update key width for row two
    kWidth = 43.59; // The keys are a little wider for the bottom 2 rows

    // set up row two
    row = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    for (let i = 0; i < 9; i++) {
      let kX = i * (kWidth + hPadding) + (kWidth / 2) + offset;
      let kY = boardY + kHeight + vPadding;
      this.keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
    }

    // set up enter key
    let kY = boardY + 2 * (kHeight + vPadding);
    this.keyMap.set("ENTER", new keyBox(offset, kY, 64.5, kHeight, "ENTER"));

    // set up row three
    row = ["Z", "X", "C", "V", "B", "N", "M"];
    for (let i = 1; i < 8; i++) {
      let kX = i * (kWidth + hPadding) + (kWidth / 2) + offset;
      this.keyMap.set(row[i - 1], new keyBox(kX, kY, kWidth, kHeight, row[i-1]));
    }
    
    // set up del key
    this.keyMap.set("DEL", new keyBox(this.keyMap.get("L").x, kY, 64.5, kHeight, "DEL"));
  }

  // draw keyboard
  draw() {
    for (let key of this.keyMap.values()) {
      key.draw();
    }
  }

  // update key color
  updateColor(letter, status) {
    // get current keyBox for letter
    let curr = this.keyMap.get(letter);
    // change its status to whatever the new status is
    curr.status = status;
    
    // set the entry in keyMap to the updated keyBox
    this.keyMap.set(letter, curr);
  }

  // get current status
  getStatus(letter) {
    // get current keyBox for letter
    let curr = this.keyMap.get(letter);
    
    // return the current status of the letter
    return curr.status;
  }
}

// wordle class to set up and maintain the overall game
class wordle {
  constructor(words, testing) {
    // initialize grid with 6 rows, 5 cols
    this.grid = new grid(6, 5);
    this.grid.draw();

    // initialize keyboard
    this.keyboard = new keyboard();
    this.keyboard.draw();

    // initialize game state
    this.state = new gameState(words, testing);

    // set initial row and column
    this.currRow = 0;
    this.currCol = 0;

    // bool to check if user has won
    this.won = false;
    // bool to check for failure
    this.failed = false;
  }

  // update keyboard and keygrid given the key that was just pressed
  update(key) {
    // clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // handle key being enter, del, or alpha
    if (key == "ENTER") {
      // build the total string for this row's guess
      let guess = "";
      for (let col = 0; col < 5; col++) {
        guess += this.grid.getLetter(this.currRow, col);
      }

      // check length of guess
      if (guess.length < 5) {
        setTimeout(this.short(), 10);
      } else if (guess.length == 5 && !this.state.wordList.includes(guess.toLowerCase())) {
        // check if word in list
        setTimeout(this.not(), 10);
      } else { // if no errors in input

        // call the gamestate update
        // we get a list of keys to color back
        let newKeyColors = this.state.check(guess);

        // color everything that's now supposed to be colored
        // don't color a key if it's already not set to absent (or whatever the status is)
        // count number of correct letters
        let correctCount = 0;
        for (let col = 0; col < 5; col++) {
          // get letter and new status from returned array
          let letter = newKeyColors[col][0];
          let status = newKeyColors[col][1];

          if (status == "correct") {
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard
            this.keyboard.updateColor(letter, status);

            // increment correct count
            correctCount++;

          } else if (status == "present") {
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard if not already correct
            if (this.keyboard.getStatus(letter) != "correct") {
              this.keyboard.updateColor(letter, status);
            }

          } else { // absent
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard only if unchanged so far
            if (this.keyboard.getStatus(letter) == "key") {
              this.keyboard.updateColor(letter, status);
            }
          }

        }

        // check if all 5 were correct
        if (correctCount == 5) {
          this.won = true;
        }

        // increment row and reset column
        this.currRow++;
        this.currCol = 0;

        // set fail true if beyond 6
        if (this.currRow > 5) {
          this.failed = true;
        }
      }

    } else if (key == "DEL") {
      // if del, decrement the column (as long as it's greater than zero)
      // reset the letter for the box to nothing

      // decrement column count
      this.currCol = this.currCol > 0 ? (this.currCol - 1) : 0;
      // if del, remove letter from column
      this.grid.updateLetter("", this.currRow, this.currCol);

    } else {
      // if just an alpha key, set the gridBox at current row and column to that key
      // check that we're within the grid
      if (this.currCol < 5) {
        this.grid.updateLetter(key, this.currRow, this.currCol);

        // then increment the column count
        this.currCol++;
      }
    }

    // redraw grid and keyboard
    this.grid.draw();
    this.keyboard.draw();

    // alert on win, but wait long enough that the canvas will be redrawn
    if (this.won) setTimeout(function() {
      alert("Amazing! You guessed the word!");
      document.location.reload();
    }, 10);

    // alert on fail, but wait long enough that the canvas will be redrawn
    if (this.failed) setTimeout(function() {
      alert("Sorry! You ran out of guesses!");
      document.location.reload();
    }, 10);
  }

  // alert if not in wordlist
  not() {
    alert("Sorry! Guess not in wordlist!");
  }

  // alert if too short
  short() {
    alert("Guess must be 5 letters!");
  }
}

// initialize the game class
// everything after is async, handled whenever the user clicks on a letter
const game = new wordle(wordList, true);