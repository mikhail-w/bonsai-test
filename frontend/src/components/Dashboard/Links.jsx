import { FiHome, FiCompass, FiUser } from 'react-icons/fi';
import { Md3dRotation } from 'react-icons/md';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { TbAugmentedReality } from 'react-icons/tb';
import { BiLeaf } from 'react-icons/bi';
import { LiaBlogSolid } from 'react-icons/lia';
import { GiPlantWatering } from 'react-icons/gi';

export const defaultLinks = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'My Info', icon: FiUser, path: '/profile/info' },
  { name: '3D Model', icon: Md3dRotation, path: '/profile/trending' },
  { name: 'Explore', icon: FiCompass, path: '/profile/explore' },
  { name: 'Blog', icon: LiaBlogSolid, path: '/profile/blog' },
  { name: 'Plant ID', icon: HiOutlineViewfinderCircle, path: '/profile/id' },
  { name: 'AR', icon: TbAugmentedReality, path: '/profile/ar' },
  { name: 'Zen Master', icon: BiLeaf, path: '/profile/chat' },
  { name: 'Care Instructions', icon: GiPlantWatering, path: '/profile/care' },
];
