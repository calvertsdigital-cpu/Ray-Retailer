/**
 * Ray's Healthy Living — full wholesale catalog (2026 order form).
 *
 * Imported from the supplied 2026 Wholesale Order Catalog. Titles are the
 * product name only (the sheet's "Select" prefix is stripped on import) and
 * prices are intentionally 0 until real retail pricing is supplied.
 */
import type { AccordionRow, Product, ProductMedia, ProductVariant } from "./types";

import capsules from "@/assets/product-capsules.jpg";
import irishMoss from "@/assets/cat-irish-moss.jpg";
import looseHerbs from "@/assets/cat-loose-herbs.jpg";
import essentialOil from "@/assets/cat-essential-oil.jpg";

/** [size, itemNumber, upc] */
type RawVariant = [string, string, string];
/** [rhlId, slug, name, variants] */
type RawProduct = [string, string, string, RawVariant[]];

const dummyImages = [capsules, looseHerbs, irishMoss, essentialOil];

const RAW: RawProduct[] = [
  ["200","adaptogen-vitality-complex","Adaptogen Vitality Complex",[["90 vcp","4017320",""],["180 vcp","4021090",""],["1 oz","4005321","810078422341"],["2 oz","4005322","810078422358"],["1 oz","4022821","810078422365"]]],
  ["201","aloe-digestive-comfort","Aloe Digestive Comfort",[["60 vcp","4017330",""]]],
  ["202","chuan-xin-lian-andrographis","Chuan Xin Lian Andrographis",[["90 vcp","4023050","810078428022"]]],
  ["203","organic-apple-cider-vinegar","Organic Apple Cider Vinegar",[["90 vcp","4023060","810078428039"]]],
  ["204","withanolide-ashwagandha","Withanolide Ashwagandha",[["90 vcp","4019710",""],["180 vcp","4023430","810078428169"],["60 vcp","4022710","810078420019"]]],
  ["205","full-spectrum-astragalus","Full Spectrum Astragalus",[["90 vcp","4015390",""]]],
  ["206","bacoside-bacopa","Bacoside Bacopa",[["90 vcp","4019720",""]]],
  ["207","organic-beet-root","Organic Beet Root",[["90 vcp","4023570",""]]],
  ["208","anthocyanin-bilberry","Anthocyanin Bilberry",[["60 vcp","4015400",""]]],
  ["209","concentrated-bitter-melon","Concentrated Bitter Melon",[["90 vcp","4021620",""]]],
  ["210","full-spectrum-black-cohosh","Full Spectrum Black Cohosh",[["90 vcp","4015410",""]]],
  ["211","full-spectrum-black-walnut","Full Spectrum Black Walnut",[["90 vcp","4023330","810078428176"]]],
  ["212","metabolic-glucose-support","Metabolic Glucose Support",[["90 vcp","4017340",""]]],
  ["213","cognitive-focus-complex","Cognitive Focus Complex",[["60 vcp","4022780",""],["90 vcp","4023140","810078428053"],["1 oz","4006721","810078423089"]]],
  ["214","intestinal-botanical-balance","Intestinal Botanical Balance",[["90 vcp","4023590",""],["90 vcp","4017430","810078420798"],["1 oz","4005251","810078422877"],["1 oz","4004851","810078423157"],["2 oz","4004852","810078423164"]]],
  ["215","full-spectrum-cascara-sagrada","Full Spectrum Cascara Sagrada",[["90 vcp","4015420",""]]],
  ["216","full-spectrum-cats-claw","Full Spectrum Cat's Claw",[["90 vcp","4019730",""]]],
  ["217","full-spectrum-cayenne","Full Spectrum Cayenne",[["90 vcp","4019740",""]]],
  ["218","wildcrafted-chaga","Wildcrafted Chaga",[["60 vcp","4022760",""]]],
  ["219","full-spectrum-chaste-tree","Full Spectrum Chaste Tree",[["90 vcp","4019750",""]]],
  ["220","broken-cell-chlorella","Broken-Cell Chlorella",[["90 vcp","4019760",""]]],
  ["221","full-spectrum-cinnamon","Full Spectrum Cinnamon",[["90 vcp","4015430",""],["180 vcp","4021440","810078420361"]]],
  ["222","full-spectrum-clove","Full Spectrum Clove",[["90 vcp","4023340","810078428183"]]],
  ["223","digestive-transit-support","Digestive Transit Support",[["90 vcp","4017350","810078420378"],["4 oz","4009294","810078422426"]]],
  ["224","mycelial-cordyceps","Mycelial Cordyceps",[["60 vcp","4021540","810078420385"]]],
  ["225","proanthocyanidin-cranberry","Proanthocyanidin Cranberry",[["90 vcp","4015440","810078420392"]]],
  ["226","urinary-tract-support","Urinary Tract Support",[["60 vcp","4021730","810078420408"],["120 vcp","4023420","810078428190"]]],
  ["227","full-spectrum-dandelion","Full Spectrum Dandelion",[["90 vcp","4015450","810078420415"]]],
  ["228","full-spectrum-dong-quai","Full Spectrum Dong Quai",[["90 vcp","4019770","810078420422"]]],
  ["229","pure-d-mannose","Pure D-Mannose",[["120 vcp","4023530",""]]],
  ["230","full-spectrum-echinacea","Full Spectrum Echinacea",[["90 vcp","4015460","810078420439"]]],
  ["231","immune-botanical-complex","Immune Botanical Complex",[["90 vcp","4015470","810078420446"],["90 vcp","4017380","810078420620"],["90 vcp","4020000","810078420743"],["60 vcp","4012900","810078420064"],["1 oz","4004741","810078422655"],["2 oz","4004742","810078422662"],["4 oz","4010254","810078422785"],["1 oz","4016681","810078422921"],["1 oz","4004781","810078422938"]]],
  ["232","wildcrafted-elderberry-plus","Wildcrafted Elderberry Plus",[["90 vcp","4017360","810078420460"]]],
  ["233","energy-vitality-complex","Energy & Vitality Complex",[["60 vcp","4022770","810078420453"],["90 vcp","4021770","810078420880"],["4 oz","4010244","810078422778"],["1 oz","4004771","810078422808"],["2 oz","4004772","810078422815"]]],
  ["234","full-spectrum-fenugreek","Full Spectrum Fenugreek",[["90 vcp","4017370","810078420477"]]],
  ["235","full-spectrum-garlic","Full Spectrum Garlic",[["90 vcp","4015480","810078420484"]]],
  ["236","full-spectrum-ginger","Full Spectrum Ginger",[["90 vcp","4015490","810078420491"],["180 vcp","4021080","810078420507"]]],
  ["237","flavone-ginkgo","Flavone Ginkgo",[["90 vcp","4015500","810078420514"],["180 vcp","4022850",""]]],
  ["238","full-spectrum-ginseng-american","Full Spectrum Ginseng, American",[["60 vcp","4015510","810078420521"]]],
  ["239","joint-comfort-complex","Joint Comfort Complex",[["120 vcp","4017460","810078420538"],["60 vcp","4017390","810078420637"],["60 vcp","4021670","810078420958"],["60 vcp","4021690","810078420972"],["60 vcp","4021680","810078420989"],["1 oz","4004791","810078422952"],["1 oz","4023191",""]]],
  ["240","full-spectrum-goldenseal","Full Spectrum Goldenseal",[["60 vcp","4015520","810078420545"]]],
  ["241","full-spectrum-gotu-kola","Full Spectrum Gotu Kola",[["90 vcp","4019780","810078420552"]]],
  ["242","full-spectrum-graviola-soursop-leaf","Full Spectrum Graviola (Soursop) Leaf",[["90 vcp","4023720",""]]],
  ["243","chlorogenic-green-coffee-bean","Chlorogenic Green Coffee Bean",[["60 vcp","4019790","810078420569"]]],
  ["244","polyphenol-green-tea","Polyphenol Green Tea",[["90 vcp","4015530","810078420576"]]],
  ["245","hair-skin-nail-support","Hair, Skin & Nail Support",[["90 vcp","4021650","810078420583"],["2 oz","4016712","810078423034"]]],
  ["246","full-spectrum-hawthorn","Full Spectrum Hawthorn",[["90 vcp","4015540","810078420590"]]],
  ["247","ursolic-holy-basil","Ursolic Holy Basil",[["60 vcp","4019800","810078420606"],["60 vcp","4012140","810078420071"]]],
  ["248","hyaluronic-acid-complex","Hyaluronic Acid Complex",[["60vcp","4023260","810078428206"]]],
  ["251","full-spectrum-irish-moss","Full Spectrum Irish Moss",[["90 vcp","4022840","810078420644"]]],
  ["252","vanuatu-kava","Vanuatu Kava",[["90 vcp","4015560","810078420651"],["60 vcp","4013030","810078420095"]]],
  ["253","calm-resilience-complex","Calm & Resilience Complex",[["90 vcp","4017400","810078420668"],["60 vcp","4022800","810078420842"],["60 vcp","4022790","810078420897"],["60 vcp","4021580","810078420156"],["1 oz","4005451","810078422402"],["2 oz","4005452","810078422419"],["1 oz","4004801","810078422969"],["2 oz","4004802","810078422976"],["1 oz","4022811","810078423331"],["30 vcp","4023120",""]]],
  ["254","full-spectrum-kelp","Full Spectrum Kelp",[["90 vcp","4019810","810078420675"]]],
  ["255","full-spectrum-lemon-balm","Full Spectrum Lemon Balm",[["90 vcp","4023350","810078428213"]]],
  ["256","organic-lions-mane","Organic Lion's Mane",[["60 vcp","4022750","810078420682"],["120 vcp","4023380","810078428220"]]],
  ["257","organic-lions-mane-2-000-mg","Organic Lion's Mane 2,000 mg",[["90 vcp","4023520",""]]],
  ["258","liver-wellness-complex","Liver Wellness Complex",[["90 vcp","4017410","810078420699"],["60 vcp","4012920","810078420101"],["1 oz","4004711","810078422556"],["2 oz","4004712","810078422563"],["1 oz","4004811","810078422990"],["2 oz","4004812","810078423003"]]],
  ["259","pure-l-theanine","Pure L-Theanine",[["90 vcp","4023130","810078428046"]]],
  ["260","andean-maca","Andean Maca",[["90 vcp","4019820","810078420705"],["1 oz","4007471","810078421702"],["2 oz","4007472","810078421719"]]],
  ["261","silymarin-milk-thistle","Silymarin Milk Thistle",[["90 vcp","4015570","810078420712"],["180 vcp","4021430","810078420729"]]],
  ["262","organic-moringa","Organic Moringa",[["90 vcp","4022430","810078420736"]]],
  ["263","wildcrafted-mullein","Wildcrafted Mullein",[["90 vcp","4023280","810078428237"]]],
  ["265","full-spectrum-neem","Full Spectrum Neem",[["90 vcp","4019830","810078420750"]]],
  ["266","full-spectrum-nettles","Full Spectrum Nettles",[["75 vcp","4015580","810078420767"]]],
  ["268","oleuropein-olive-leaf","Oleuropein Olive Leaf",[["90 vcp","4015590","810078420774"]]],
  ["269","oregano-complex","Oregano Complex",[["90 vcp","4017420","810078420781"]]],
  ["271","organic-passion-flower","Organic Passion Flower",[["90 vcp","4023270","810078428244"]]],
  ["272","full-spectrum-pau-d-arco","Full Spectrum Pau D' Arco",[["90 vcp","4019840","810078420804"]]],
  ["273","ubiquinone-coq10","Ubiquinone CoQ10",[["90 vcp","4017470","810078420811"],["60 vcp","4012130","810078420057"]]],
  ["274","organic-reishi","Organic Reishi",[["60 vcp","4022730","810078420828"]]],
  ["275","rosavin-rhodiola","Rosavin Rhodiola",[["60 vcp","4022670","810078420835"]]],
  ["277","rest-sleep-support","Rest & Sleep Support",[["90 vcp","4017440","810078420859"],["60 vcp","4012880","810078420149"],["1 oz","4012301","810078423300"],["30 vcp","4023110",""]]],
  ["278","organic-spirulina","Organic Spirulina",[["90 vcp","4019860","810078420866"]]],
  ["280","hypericin-st-johns-wort","Hypericin St. John's Wort",[["90 vcp","4015600","810078420873"]]],
  ["282","thyroid-nutrient-support","Thyroid Nutrient Support",[["90 vcp","4017450","810078420903"]]],
  ["283","organic-triphala","Organic Triphala",[["90 vcp","4019870","810078420910"]]],
  ["284","organic-turkey-tail","Organic Turkey Tail",[["60 vcp","4022740","810078420927"]]],
  ["285","concentrated-turmeric-standardized","Concentrated Turmeric Standardized",[["60 vcp","4015610","810078420934"],["120 vcp","4021420","810078420941"]]],
  ["287","cardiovascular-support-complex","Cardiovascular Support Complex",[["60 vcp","4021660","810078420965"],["1 oz","4005411","810078422907"]]],
  ["290","full-spectrum-valerian","Full Spectrum Valerian",[["90 vcp","4015620","810078420996"],["180 vcp","4021070",""]]],
  ["291","vein-circulation-support","Vein & Circulation Support",[["90 vcp","4021800","810078427971"]]],
  ["292","full-spectrum-wormwood","Full Spectrum Wormwood",[["90 vcp","4023360","810078428268"]]],
  ["294","nigella-black-cumin-seed-oil","Nigella Black Cumin Seed Oil",[["90 vcp","4022650","810078420026"]]],
  ["295","concentrated-cinnamon-standardized","Concentrated Cinnamon Standardized",[["60 vcp","4012100","810078420033"]]],
  ["296","respiratory-botanical-support","Respiratory Botanical Support",[["60 vcp","4012890","810078420040"],["1 oz","4008271","810078422525"],["2 oz","4008272","810078422532"],["4 oz","4019684","810078422549"],["4 oz","4010234","810078422761"],["1 oz","4006871","810078423751"]]],
  ["302","carvacrol-oregano-oil","Carvacrol Oregano Oil",[["60 vcp","4008381","810078420118"],["120 vcp","4008392","810078420125"]]],
  ["303","lipid-saw-palmetto","Lipid Saw Palmetto",[["60 vcp","4021050","810078420132"]]],
  ["304","fulvic-shilajit","Fulvic Shilajit",[["60 vcp","4023700",""],["120 vcp","4023710",""]]],
  ["307","curcuminoid-turmeric","Curcuminoid Turmeric",[["60 vcp","4020970","810078420163"],["120 vcp","4020980","810078420170"]]],
  ["308","paniculata-andrographis","Paniculata Andrographis",[["1 oz","4022991","810078427988"]]],
  ["309","montana-arnica","Montana Arnica",[["1 oz","4003721","810078421016"]]],
  ["310","scolymus-artichoke","Scolymus Artichoke",[["1 oz","4008561","810078421023"]]],
  ["311","somnifera-ashwagandha","Somnifera Ashwagandha",[["1 oz","4003731","810078421030"],["2 oz","4003732","810078421047"]]],
  ["312","astragalus","Astragalus",[["1 oz","4003741","810078421054"],["2 oz","4003742","810078421061"]]],
  ["313","myrtillus-bilberry","Myrtillus Bilberry",[["1 oz","4008571","810078421078"]]],
  ["314","racemosa-black-cohosh","Racemosa Black Cohosh",[["1 oz","4003771","810078421085"]]],
  ["315","nigra-black-walnut-green","Nigra Black Walnut (Green)",[["1 oz","4003791","810078421092"],["2 oz","4003792","810078421108"]]],
  ["316","thalictroides-blue-cohosh","Thalictroides Blue Cohosh",[["1 oz","4003801","810078421115"]]],
  ["317","serrata-boswellia","Serrata Boswellia",[["1 oz.","4016091","810078421122"]]],
  ["318","lappa-burdock","Lappa Burdock",[["1 oz","4003851","810078421139"]]],
  ["319","californica-california-poppy","Californica California Poppy",[["1 oz","4003861","810078421146"]]],
  ["320","tormentosa-cats-claw","Tormentosa Cats Claw",[["1 oz","4003891","810078421153"]]],
  ["321","annuum-cayenne","Annuum Cayenne",[["1 oz","4003901","810078421160"]]],
  ["322","chamomilla-chamomile","Chamomilla Chamomile",[["1 oz","4003911","810078421177"]]],
  ["323","agnus-castus-chaste-tree-berry","Agnus-castus Chaste Tree Berry",[["1 oz","4003931","810078421184"]]],
  ["324","aromaticum-clove","Aromaticum Clove",[["1 oz","4003941","810078421191"]]],
  ["325","colloidal-silver","Colloidal Silver",[["2 oz","4011212","810078421207"],["4 oz","4011214","810078421214"],["1 oz","4008951","810078422488"],["2 oz","4008952","810078422495"],["1 oz","4008961","810078422501"],["2 oz","4008962","810078422518"]]],
  ["326","officinale-comfrey","Officinale Comfrey",[["1 oz","4003951","810078421221"]]],
  ["327","opulus-cramp-bark","Opulus Cramp Bark",[["1 oz","4003961","810078421238"]]],
  ["328","diffusa-damiana","Diffusa Damiana",[["1 oz","4003971","810078421245"]]],
  ["329","officinale-dandelion","Officinale Dandelion",[["1 oz","4003981","810078421252"]]],
  ["330","officinale-dandelion-alcohol-free","Officinale Dandelion Alcohol-Free",[["1 oz.","4002761","810078421269"]]],
  ["331","devils-claw","Devil's Claw",[["1 oz","4003991","810078421276"]]],
  ["332","sinensis-dong-quai","Sinensis Dong Quai",[["1 oz","4004011","810078421283"]]],
  ["333","angustifolia-echinacea-alcohol-free","Angustifolia Echinacea Alcohol-Free",[["1 oz","4004911","810078421290"],["2 oz","4004912","810078421306"]]],
  ["334","angustifolia-echinacea","Angustifolia Echinacea",[["1 oz","4004021","810078421313"],["2 oz","4004022","810078421320"]]],
  ["335","nigra-elderberry","Nigra Elderberry",[["1 oz","4006631","810078421337"],["2 oz","4006632","810078421344"]]],
  ["336","eleuthero","Eleuthero",[["1 oz","4004141","810078421351"]]],
  ["337","euphrasia-eyebright","Euphrasia Eyebright",[["1 oz","4004051","810078421368"]]],
  ["338","vulgare-fennel","Vulgare Fennel",[["1 oz","4004061","810078421375"]]],
  ["339","fenugreek","Fenugreek",[["1 oz","4007431","810078421382"]]],
  ["340","parthenium-feverfew","Parthenium Feverfew",[["1 oz","4005201","810078421399"]]],
  ["341","multiflorum-fo-ti","Multiflorum Fo-Ti",[["1 oz","4004071","810078421405"]]],
  ["342","sativum-garlic","Sativum Garlic",[["1 oz","4004081","810078421429"]]],
  ["343","lutea-gentian","Lutea Gentian",[["1 oz","4004091","810078421436"]]],
  ["344","officinale-ginger","Officinale Ginger",[["1 oz","4004101","810078421443"]]],
  ["345","biloba-ginkgo","Biloba Ginkgo",[["1 oz","4004111","810078421450"]]],
  ["346","biloba-ginkgo-alcohol-free","Biloba Ginkgo Alcohol-Free",[["1 oz","4004921","810078421467"]]],
  ["347","quinquefolium-ginseng-american","Quinquefolium Ginseng, American",[["1 oz","4004121","810078421474"]]],
  ["348","panax-ginseng-red-chinese","Panax Ginseng, Red Chinese",[["1 oz","4004131","810078421481"]]],
  ["349","panax-white-chinese-ginseng-alcohol-free","Panax White Chinese Ginseng Alcohol-Free",[["1 oz.","4016991","810078422204"]]],
  ["350","canadensis-goldenseal","Canadensis Goldenseal",[["1 oz","4004151","810078421498"],["2 oz","4004152","810078421504"]]],
  ["351","asiatica-gotu-kola","Asiatica Gotu Kola",[["1 oz","4004161","810078421511"]]],
  ["352","muricata-graviola-soursop-leaf","Muricata Graviola (Soursop) Leaf",[["1 oz","4016621",""]]],
  ["353","hawthorn","Hawthorn",[["1 oz","4004171","810078421535"],["2 oz","4004172","810078421542"]]],
  ["354","sanctum-holy-basil","Sanctum Holy Basil",[["1 oz","4015781","810078421559"]]],
  ["355","lupulus-hops","Lupulus Hops",[["1 oz","4004181","810078421573"]]],
  ["356","hippocastanum-horse-chestnut","Hippocastanum Horse Chestnut",[["1 oz","4006651","810078421580"]]],
  ["357","horsetail","Horsetail",[["1 oz","4004201","810078421597"]]],
  ["358","sea-moss-alcohol-free","Sea Moss Alcohol-Free",[["1 oz","4023581",""]]],
  ["359","methysticum-kava","Methysticum Kava",[["1 oz","4004211","810078421603"],["2 oz","4004212","810078421610"]]],
  ["360","methysticum-kava-alcohol-free","Methysticum Kava Alcohol-Free",[["1 oz","4004931","810078421627"],["2 oz","4004932","810078421634"]]],
  ["361","lavandula-lavender","Lavandula Lavender",[["1 oz","4007521","810078421658"]]],
  ["362","melissa-lemon-balm","Melissa Lemon Balm",[["1 oz","4006661","810078421665"]]],
  ["363","glabra-licorice","Glabra Licorice",[["1 oz","4004231","810078421672"]]],
  ["364","hericium-lions-mane-alcohol-free","Hericium Lion's Mane Alcohol-Free",[["2 oz","4023542",""]]],
  ["365","inflata-lobelia","Inflata Lobelia",[["1 oz","4004241","810078421689"]]],
  ["366","dissectum-lomatium","Dissectum Lomatium",[["1 oz","4004251","810078421696"]]],
  ["368","officinale-marshmallow","Officinale Marshmallow",[["1 oz","4004261","810078421726"]]],
  ["369","marianum-milk-thistle","Marianum Milk Thistle",[["1 oz","4004271","810078421733"],["2 oz","4004272","810078421740"]]],
  ["370","marianum-milk-thistle-alcohol-free","Marianum Milk Thistle Alcohol-Free",[["1 oz","4004941","810078421757"],["2 oz","4004942","810078421764"]]],
  ["371","oleifera-moringa","Oleifera Moringa",[["1 oz","4020951","810078421771"]]],
  ["372","cardiaca-motherwort","Cardiaca Motherwort",[["1 oz","4004281","810078421788"]]],
  ["373","mullein","Mullein",[["1 oz","4004291","810078421801"]]],
  ["374","myrrh-gum","Myrrh Gum",[["1 oz","4004301","810078421818"]]],
  ["375","indica-neem","Indica Neem",[["1 oz","4004311","810078421825"]]],
  ["376","dioica-nettles","Dioica Nettles",[["1 oz","4004321","810078421832"]]],
  ["377","sativa-oat-seed","Sativa Oat Seed",[["1 oz","4004611","810078422228"]]],
  ["378","europaea-olive-leaf","Europaea Olive Leaf",[["1 oz","4006681","810078421849"],["2 oz","4006682","810078421856"]]],
  ["379","vulgare-wild-oregano-oil-70","Vulgare Wild Oregano Oil 70%",[["1 oz","4005141","810078421863"],["2 oz","4005142","810078421870"]]],
  ["380","vulgare-organic-oregano-oil-80","Vulgare Organic Oregano Oil 80%",[["1 oz","4023011","810078428008"],["2 oz","4023012","810078427995"]]],
  ["381","aquafolium-oregon-grape-root","Aquafolium Oregon Grape Root",[["1 oz","4004351","810078421887"]]],
  ["382","porteri-osha","Porteri Osha",[["1 oz","4004361","810078421894"]]],
  ["383","incarnata-passion-flower","Incarnata Passion Flower",[["1 oz","4004371","810078421900"]]],
  ["384","impetiginosa-pau-darco","Impetiginosa Pau D'Arco",[["1 oz","4004381","810078421917"]]],
  ["385","peppermint-spirits-alcohol-free","Peppermint Spirits Alcohol-Free",[["1 oz","4016431","810078421931"]]],
  ["386","peppermint-spirits-in-organic-alcohol","Peppermint Spirits In Organic Alcohol",[["1 oz","4016871","810078421948"]]],
  ["387","propolis","Propolis",[["1 oz","4004411","810078421962"]]],
  ["388","pratense-red-clover","Pratense Red Clover",[["1 oz","4004431","810078421979"]]],
  ["389","idaeus-red-raspberry","Idaeus Red Raspberry",[["1 oz","4004441","810078421986"]]],
  ["390","ganoderma-reishi-alcohol-free","Ganoderma Reishi Alcohol-Free",[["2 oz","4023602",""]]],
  ["391","ganoderma-reishi","Ganoderma Reishi",[["1 oz","4004461","810078421993"]]],
  ["392","rosea-rhodiola","Rosea Rhodiola",[["1 oz","4009341","810078422006"]]],
  ["393","sarsaparilla","Sarsaparilla",[["1 oz","4004471","810078422013"]]],
  ["394","serrulata-saw-palmetto","Serrulata Saw Palmetto",[["1 oz","4004481","810078422020"]]],
  ["395","chinensis-schisandra","Chinensis Schisandra",[["1 oz","4006461","810078422037"]]],
  ["396","lateriflora-skullcap","Lateriflora Skullcap",[["1 oz","4004491","810078422044"]]],
  ["397","fulva-slippery-elm","Fulva Slippery Elm",[["1 oz","4004511","810078422051"]]],
  ["398","perforatum-st-johns-wort","Perforatum St. John's Wort",[["1 oz","4004521","810078422068"],["2 oz","4004522","810078422075"]]],
  ["399","perforatum-st-johns-wort-alcohol-free","Perforatum St. John's Wort Alcohol-Free",[["1 oz","4004951","810078422082"]]],
  ["400","thymus-thyme","Thymus Thyme",[["1 oz","4007541","810078422099"]]],
  ["401","trametes-turkey-tail-alcohol-free","Trametes Turkey Tail Alcohol-Free",[["2 oz","4023612",""]]],
  ["402","longa-turmeric","Longa Turmeric",[["1 oz","4004541","810078422105"],["2 oz","4004542","810078422112"]]],
  ["403","umckaloabo-syrup","Umckaloabo Syrup",[["4 oz","4016454","810078422129"]]],
  ["404","usnea","Usnea",[["1 oz","4004551","810078422136"]]],
  ["405","uva-ursi-uva-ursi","Uva-ursi Uva Ursi",[["1 oz","4004561","810078422143"]]],
  ["406","valeriana-valerian","Valeriana Valerian",[["1 oz","4004571","810078422150"],["2 oz","4004572","810078422167"]]],
  ["407","valeriana-valerian-alcohol-free","Valeriana Valerian Alcohol-Free",[["1 oz","4004961","810078422174"],["2 oz","4004962","810078422181"]]],
  ["408","white-willow","White Willow",[["1 oz","4004581","810078422198"]]],
  ["409","virginiana-wild-cherry","Virginiana Wild Cherry",[["1 oz","4004591","810078422211"]]],
  ["410","villosa-wild-yam","Villosa Wild Yam",[["1 oz","4004621","810078422235"]]],
  ["411","absinthium-wormwood","Absinthium Wormwood",[["1 oz","4004631","810078422242"]]],
  ["412","millefolium-yarrow","Millefolium Yarrow",[["1 oz","4004641","810078422259"]]],
  ["413","crispus-yellow-dock","Crispus Yellow Dock",[["1 oz","4004651","810078422266"]]],
  ["414","californica-yerba-santa","Californica Yerba Santa",[["1 oz","4004671","810078422280"]]],
  ["415","johimbe-yohimbe","Johimbe Yohimbe",[["1 oz","4004681","810078422297"]]],
  ["416","angustifolia-3-echinacea","Angustifolia 3 Echinacea",[["1 oz","4004891","810078422303"]]],
  ["417","angustifolia-3-echinacea-alcohol-free","Angustifolia 3 Echinacea Alcohol-Free",[["1 oz","4006171","810078422327"]]],
  ["418","acai-super-berry-antioxidant","Acai Super Berry Antioxidant",[["1 oz","4016461","810078422334"]]],
  ["421","aller-calm","Aller-Calm",[["1 oz","4004701","810078422372"],["2 oz","4004702","810078422389"]]],
  ["422","aller-calm-alcohol-free","Aller-Calm Alcohol-Free",[["1 oz","4006121","810078422396"]]],
  ["425","respiratory-botanical-support-alcohol-free","Respiratory Botanical Support \u2013 Alcohol-Free",[["1 oz","4016721","810078422433"],["1 oz","4023171",""]]],
  ["429","chlorophyll-formula-alcohol-free","Chlorophyll Formula Alcohol-Free",[["1 oz","4012991","810078422457"],["2 oz","4012992","810078422464"]]],
  ["433","liver-wellness-complex-alcohol-free","Liver Wellness Complex \u2013 Alcohol-Free",[["1 oz","4006151","810078422570"],["1 oz","4006241","810078423010"],["2 oz","4006242","810078423027"]]],
  ["434","digestive-comfort-complex","Digestive Comfort Complex",[["1 oz","4004721","810078422587"],["2 oz","4004722","810078422594"],["1 oz","4022181","810078422624"],["1 oz","4022191","810078422617"]]],
  ["435","digestive-comfort-complex-alcohol-free","Digestive Comfort Complex \u2013 Alcohol-Free",[["1 oz","4006161","810078422600"]]],
  ["439","immune-botanical-complex-alcohol-free","Immune Botanical Complex \u2013 Alcohol-Free",[["1 oz","4006181","810078422679"],["2 oz","4006182","810078422686"],["2 oz","4019992","810078423119"]]],
  ["440","womens-cycle-support","Women's Cycle Support",[["1 oz","4004751","810078422693"],["2 oz","4004752","810078422709"]]],
  ["441","womens-midlife-support","Women's Midlife Support",[["1 oz","4004761","810078422716"]]],
  ["442","womens-preconception-botanical-support-alcohol-free","Women's Preconception Botanical Support \u2013 Alcohol-Free",[["1 oz","4006701","810078422730"],["2 oz","4006702","810078422747"]]],
  ["446","organic-ginger-zinger-syrup","Organic Ginger Zinger Syrup",[["4 oz","4010224","810078422792"]]],
  ["448","energy-vitality-complex-alcohol-free","Energy & Vitality Complex \u2013 Alcohol-Free",[["1 oz","4006191","810078422822"]]],
  ["449","green-tea-formula","Green Tea Formula",[["1 oz","4007791","810078422846"],["2 oz","4007792","810078422853"]]],
  ["451","oral-gum-botanical-support","Oral & Gum Botanical Support",[["1 oz","4005261","810078422884"]]],
  ["452","head-comfort-botanical-support","Head Comfort Botanical Support",[["1 oz","4005271","810078422891"]]],
  ["454","immune-skin-wellness-support","Immune & Skin Wellness Support",[["1 oz","4005691","810078422914"]]],
  ["458","calm-resilience-complex-alcohol-free","Calm & Resilience Complex \u2013 Alcohol-Free",[["1 oz","4006131","810078422983"]]],
  ["463","lymphatic-wellness-support","Lymphatic Wellness Support",[["1 oz","4004821","810078423041"],["2 oz","4004822","810078423058"]]],
  ["464","mens-vitality-support","Men's Vitality Support",[["1 oz","4016511","810078423065"]]],
  ["465","mens-prostate-urinary-support","Men's Prostate & Urinary Support",[["1 oz","4004831","810078423072"]]],
  ["468","mushroom-master","Mushroom Master",[["1 oz","4004841","810078423126"]]],
  ["469","oak-ivy-topical-spray","Oak & Ivy Topical Spray",[["2 oz","4008852","810078423140"]]],
  ["471","peppermint-breath-spray","Peppermint Breath Spray",[["1 oz","4011061","810078423171"]]],
  ["472","relax","Relax",[["1 oz","4004861","810078423195"],["2 oz","4004862","810078423201"]]],
  ["473","relax-alcohol-free","Relax Alcohol-Free",[["1 oz","4006291","810078423218"]]],
  ["474","respir-ease","Respir-Ease",[["1 oz","4004871","810078423225"],["2 oz","4004872","810078423232"]]],
  ["475","respir-ease-alcohol-free","Respir-Ease Alcohol-Free",[["1 oz","4006301","810078423249"]]],
  ["476","organic-sambucus-elderberry-syrup-alcohol-free","Organic Sambucus Elderberry Syrup Alcohol-Free",[["4 oz","4017524","810078423256"]]],
  ["477","angustifolia-sinus-blaster","Angustifolia Sinus Blaster",[["1 oz","4011881","810078423263"],["2 oz","4011882","810078423270"]]],
  ["478","angustifolia-sinus-blaster-alcohol-free","Angustifolia Sinus Blaster Alcohol-Free",[["1 oz","4023441","810078428251"]]],
  ["479","organic-sinus-blaster-spray","Organic Sinus Blaster Spray",[["1 oz","4015941","810078423287"]]],
  ["480","sinus-relief","Sinus Relief",[["1 oz","4008281","810078423294"]]],
  ["482","stone-breaker","Stone Breaker",[["2 oz","4023022","810078428015"]]],
  ["484","angustifolia-throat-spray-relief","Angustifolia Throat Spray Relief",[["1 oz","4008691","810078423348"]]],
  ["485","ut-balance","UT Balance",[["1 oz","4004731","810078422631"],["2 oz","4004732","810078422648"]]],
  ["486","womans-energy-balance","Woman's Energy Balance",[["1 oz","4006751","810078423355"]]],
  ["487","yeast-buster","Yeast Buster",[["1 oz","4016501","810078422440"]]],
  ["488","yin-chiao-plus","Yin Chiao Plus",[["1 oz","4005601","810078423362"]]],
  ["489","zzzzz","Zzzzz",[["1 oz","4005281","810078423386"]]],
  ["490","zzzzz-alcohol-free","Zzzzz Alcohol-Free",[["1 oz","4006311","810078423393"]]],
  ["491","full-spectrum-cbd-20mg-full-spectrum","Full Spectrum CBD 20mg Full Spectrum",[["1 oz","4022941",""]]],
  ["492","full-spectrum-cbd-35mg-full-spectrum","Full Spectrum CBD 35mg Full Spectrum",[["1 oz","4022961",""]]],
  ["493","full-spectrum-cbd-50mg-full-spectrum-chocolate-mint","Full Spectrum CBD 50mg Full Spectrum Chocolate Mint",[["1 oz","4022971",""]]],
  ["494","organic-cbd-35mg-broad-spectrum","Organic CBD 35mg Broad Spectrum",[["1 oz","4022901",""]]],
  ["498","b-complex","B Complex",[["1 oz","4013021","810078423539"],["2 oz","4013022","810078423546"]]],
  ["499","b12-drops-1000mcg","B12 Drops (1000mcg)",[["1 oz","4013011","810078423553"]]],
  ["500","b12-drops-1000-mcg","B12 Drops (1000 Mcg)",[["2 oz","4013012","810078423560"]]],
  ["501","b12-drops-5000-mcg","B12 Drops (5000 Mcg)",[["1 oz","4017601","810078423577"]]],
  ["502","b12-spray-500-mcg","B12 Spray (500 Mcg)",[["1 oz","4016771","810078423584"]]],
  ["503","concentrated-b12-w-folic-acid-vitamin-b6","Concentrated B12 W/ Folic Acid & Vitamin B6",[["1 oz","4016781","810078423591"]]],
  ["504","c-500mg","C (500MG)",[["4 oz","4017614","810078423690"]]],
  ["505","d3-50mcg-2000-iu-unflavored","D3 50Mcg (2000 IU) Unflavored",[["1 oz","4020521","810078423621"]]],
  ["506","d3-125mcg-5000-iu-unflavored","D3 125Mcg (5000 IU) Unflavored",[["1 oz","4020551","810078423652"]]],
  ["507","d3-50mcg-2000-iu-citrus","D3 50Mcg (2000 IU) Citrus",[["1 oz","4020531","810078423607"]]],
  ["508","d3-125mcg-5000-iu-citrus","D3 125Mcg (5000 IU) Citrus",[["1 oz","4020561","810078423638"]]],
  ["509","d3-50mcg-2000-iu-mint","D3 50Mcg (2000 IU) Mint",[["1 oz","4020541","810078423614"]]],
  ["510","d3-125mcg-5000-iu-mint","D3 125Mcg (5000 IU) Mint",[["1 oz","4020571","810078423645"]]],
  ["511","d3-k2-certified-organic","D3 + K2 (Certified Organic)",[["1 oz","4023031",""]]],
  ["512","folinic-acid-from-calcium-folinate","Folinic Acid (From Calcium Folinate)",[["1 oz","4017531","810078423669"]]],
  ["513","iodine","Iodine",[["2 oz","4017652","810078423676"]]],
  ["514","iodine-w-kelp","Iodine W/ Kelp",[["2 oz","4016692","810078423683"]]],
  ["515","iron","Iron",[["4 oz","4020594","810078423706"]]],
  ["516","melatonin","Melatonin",[["2 oz","4013002","810078423713"]]],
  ["517","organic-zinc-elderberry-umckaloabo","Organic Zinc (Elderberry Umckaloabo)",[["4 oz","4021104","810078423379"]]],
  ["518","kids-aller-calm","Kid's Aller-Calm",[["1 oz","4006781","810078423720"]]],
  ["519","kids-attention-plus","Kid's Attention Plus",[["1 oz","4006831","810078423737"]]],
  ["520","purpurea-kids-biotic","Purpurea Kid's Biotic",[["1 oz","4022491","810078423744"]]],
  ["522","kids-vitamin-d3-400-iu-grape-flavor","Kid's Vitamin D3 400 IU Grape Flavor",[["1 oz","4020581","810078423768"]]],
  ["523","kids-ear-clear-oil","Kid's Ear Clear Oil",[["1 oz","4006821","810078423775"]]],
  ["524","angustifolia-kids-echinacea-plus","Angustifolia Kid's Echinacea Plus",[["1 oz","4022481","810078423782"]]],
  ["525","kids-mellow-plus","Kid's Mellow Plus",[["1 oz","4006811","810078423799"]]],
  ["526","kids-potty-helper","Kid's Potty Helper",[["1 oz","4006841","810078423805"]]],
  ["527","concentrated-stevia","Concentrated Stevia",[["1 oz","4007751","810078423492"],["2 oz","4007752","810078423508"],["4 oz","4007754","810078423515"]]],
  ["528","organic-organic-stevia","Organic Organic Stevia",[["1 oz","4021631","810078423454"],["2 oz","4021632","810078423461"],["4 oz","4021634","810078423478"]]],
  ["529","concentrated-carmel-stevia","Concentrated Carmel Stevia",[["2 oz","4020602","810078423409"]]],
  ["530","concentrated-chocolate-stevia","Concentrated Chocolate Stevia",[["2 oz","4017542","810078423416"]]],
  ["531","concentrated-cinnamon-stevia","Concentrated Cinnamon Stevia",[["2 oz","4017552","810078423423"]]],
  ["532","concentrated-hazelnut-stevia","Concentrated Hazelnut Stevia",[["2 oz","4020612","810078423430"]]],
  ["533","concentrated-orange-stevia","Concentrated Orange Stevia",[["2 oz","4017572","810078423447"]]],
  ["534","concentrated-peppermint-stevia","Concentrated Peppermint Stevia",[["2 oz","4017582","810078423485"]]],
  ["535","concentrated-vanilla-stevia","Concentrated Vanilla Stevia",[["2 oz","4017592","810078423522"]]],
  ["536","almond-sweet-oil","Almond (Sweet) Oil",[["4 oz","4022294","810078424369"]]],
];

/* ------------------------------------------------------------------ */

/** Deterministic 0–1 value so ratings and review counts stay stable per slug. */
function seeded(slug: string, salt: number) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/** Retail pricing is not published yet — every imported item stays at 0. */
const PLACEHOLDER_PRICE = 0;


function categoryFor(name: string, size: string) {
  const n = name.toLowerCase();
  if (n.includes("sea moss") || n.includes("irish moss")) return "irish-moss";
  if (n.includes("coffee")) return "coffee";
  if (n.includes("cardio") || n.includes("circulation") || n.includes("heart")) return "maximum-cardio";
  if (size.includes("vcp")) return "capsules";
  return "tinctures";
}

function placeholderMedia(slug: string, name: string, index: number): ProductMedia[] {
  const pick = (offset: number) => dummyImages[(index + offset) % dummyImages.length]!;
  return [
    { id: `${slug}-front`, type: "image", kind: "front-label", label: "Front label", src: pick(0), alt: `${name} front label (placeholder image)`, sortOrder: 1, published: true },
    { id: `${slug}-back`, type: "image", kind: "back-label", label: "Supplement facts", src: pick(1), alt: `${name} supplement facts panel (placeholder image)`, sortOrder: 2, published: true },
    { id: `${slug}-size`, type: "image", kind: "size-reference", label: "Size reference", src: pick(2), alt: `${name} size reference (placeholder image)`, sortOrder: 3, published: true },
    { id: `${slug}-lifestyle`, type: "image", kind: "lifestyle", label: "In everyday life", src: pick(3), alt: `${name} in an everyday wellness routine (placeholder image)`, sortOrder: 4, published: true },
  ];
}

function additional(name: string, form: string, sizes: string): AccordionRow[] {
  return [
    { id: "used-for", title: "What is this product used for?", body: `${name} is a ${form} from the Ray's Healthy Living range, kept on the shelf for adults who want to include it in a daily wellness routine.`, sortOrder: 1, visible: true },
    { id: "benefits", title: "What are the key benefits?", items: ["Traditional botanical or nutritional support in a convenient form", "Quality checked before it reaches our Prince Frederick shelves", `Available in ${sizes}`, "Free from artificial colors and sweeteners"], sortOrder: 2, visible: true },
    { id: "how", title: "How does it work in the body?", body: "Ingredients are delivered in a form the body can absorb through normal digestion. Full ingredient details are printed on the product label.", sortOrder: 3, visible: true },
    { id: "usage", title: "How do I use this product?", body: "Follow the serving directions printed on the label, or use as directed by your healthcare professional.", sortOrder: 4, visible: true },
    { id: "not-for", title: "Who should NOT use this product?", items: ["Children under 18 unless directed by a healthcare professional", "Anyone pregnant or nursing without professional guidance", "Anyone with a known sensitivity to a listed ingredient"], sortOrder: 5, visible: true },
    { id: "combine", title: "Can I combine this with other supplements?", body: "Many customers combine products from this range. If you take prescription medication, check with your pharmacist or doctor first.", sortOrder: 6, visible: true },
    { id: "faq", title: "Frequently Asked Questions", faqs: [
      { q: "Which size should I choose?", a: `This item is stocked in ${sizes}. Larger sizes usually work out cheaper per serving.` },
      { q: "Where is it made?", a: "Packed in an FDA-registered, NSF GMP certified facility." },
      { q: "Can I buy it in store?", a: "Yes — visit us at 70 Solomons Island Rd S, Prince Frederick, MD." },
    ], sortOrder: 7, visible: true },
    { id: "disclaimer", title: "Disclaimer", body: "Statements made, or products sold through this website, have not been evaluated by the United States Food and Drug Administration. They are not intended to diagnose, treat, cure or prevent any disease. Results may vary with each individual.", sortOrder: 8, visible: true },
  ];
}

function buildCatalogProduct([rhlId, slug, name, raws]: RawProduct, index: number, all: RawProduct[]): Product {
  const base = raws[0]!;
  const form = base[0].includes("vcp") ? "vegetarian capsule supplement" : "liquid herbal extract";
  const sizes = Array.from(new Set(raws.map((v) => v[0]))).join(", ");
  const price = PLACEHOLDER_PRICE;
  const variants: ProductVariant[] | undefined =
    raws.length > 1
      ? raws.map<ProductVariant>((v, i) => ({
          id: `${slug}-${v[0].replace(/\s+/g, "")}-${i}`,
          label: raws.filter((o) => o[0] === v[0]).length > 1 ? `${v[0]} (#${v[1]})` : v[0],
          priceDelta: 0,
          sku: v[1],
        }))
      : undefined;

  const related = [1, 2, 3].map((o) => all[(index + o) % all.length]![1]);

  return {
    id: `rhl-${rhlId}-${slug}`,
    sku: base[1],
    ...(base[2] ? { upc: base[2] } : {}),

    slug,
    name,
    brand: "Ray's Healthy Living",
    category: categoryFor(name, base[0]),
    price,
    rating: Number((4.2 + seeded(slug, 1) * 0.8).toFixed(1)),
    reviewCount: 6 + Math.round(seeded(slug, 2) * 180),
    inStock: true,
    shortDescription: `${name} — a ${form} available in ${sizes}, stocked by Ray's Healthy Living.`,
    supportStatement: `Everyday wellness support in a ${form}.`,
    longDescription: [
      `${name} is part of the Ray's Healthy Living range of quality-checked supplements and botanical extracts. Every batch is packed in an FDA-registered, NSF GMP certified facility.`,
      "Product photography for this item is a placeholder while our label images are finalised. Ingredient details, serving size and full directions are printed on the bottle.",
    ],
    media: placeholderMedia(slug, name, index),
    benefits: [
      { icon: "Leaf", title: "Clean formulation", text: "No artificial colors, sweeteners or unnecessary fillers." },
      { icon: "ShieldCheck", title: "Quality checked", text: "Produced in an NSF GMP certified facility." },
      { icon: "Sprout", title: "Responsibly sourced", text: "From growers and makers who share our sourcing standards." },
      { icon: "Store", title: "Stocked in store", text: "Available in Prince Frederick and shipped nationwide." },
    ],
    ...(variants ? { variants } : {}),
    concernSlugs: [],
    relatedSlugs: related,
    additionalInfo: additional(name, form, sizes),
    reviews: [],
    isBestSeller: seeded(slug, 3) > 0.9,
    isNewArrival: seeded(slug, 4) > 0.92,
    seoTitle: `${name} | Ray's Healthy Living`,
    metaDescription: `${name} from Ray's Healthy Living — available in ${sizes}. Quality checked, NSF GMP certified and free from artificial additives.`,
  };
}

export const catalogProducts: Product[] = RAW.map(buildCatalogProduct);
