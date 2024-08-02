const scarletVioletSeries = [
  'Shrouded Fables',
  'Twilight Masquerade',
  'Temporal Forces',
  'Paldaen Fates',
  'Paradox Rift',
  'Scarlet Violet 151',
  'McDonalds 2023',
  'Obsidian Flames',
  'Paldea Evolved',
  'Scarlet Violet',
  'Scarlet Violet English Promos',
] as const

const swordShieldSeries = [
  'Crown Zenith',
  'Crown Zenith Galarian Gallery',
  'Silver Tempest',
  'Silver Tempest Trainer Gallery',
  'Lost Origin',
  'Lost Origin Trainer Gallery',
  'Holiday Calendar 2022',
  'McDonalds Match Battle',
  'English Pokemon Go',
  'Astral Radiance',
  'Astral Radiance Trainer Gallery',
  'Brilliant Stars',
  'Brilliant Stars Trainer Gallery',
  'Fusion Strike',
  'Celebrations',
  'Evolving Skies',
  'Chilling Reign',
  'Battle Styles',
  'Shining Fates',
  'McDonalds 25th Anniversary',
  'Vivid Voltage',
  'Champions Path',
  'Pokemon Futsal Promos',
  'Darkness Ablaze',
  'Rebel Clash',
  'English Sword Shield',
  'English Sword Shield Promos',
] as const

const collectionSets = [
  'Trick or Trade 2023',
  'Trick or Trade',
  'Holiday Calendar 2023',
  'Holiday Calendar 2022',
] as const

const expansionSets = [...scarletVioletSeries, ...swordShieldSeries] as const
const allPokemonCardSets = [...expansionSets, ...collectionSets] as const

type ExpansionSet = (typeof expansionSets)[number]
type CollectionSet = (typeof collectionSets)[number]
type PokemonCardSet = ExpansionSet | CollectionSet

export {
  collectionSets,
  expansionSets,
  allPokemonCardSets,
  ExpansionSet,
  CollectionSet,
  PokemonCardSet,
}
