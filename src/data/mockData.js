// Mock data for the application

export const artists = [
  {
    id: 1,
    name: 'mzaca',
    image: '/th.jpg',
    bio: 'Mzaca is a talented and passionate artist hailing from the vibrant music scene of South Africa. With a unique blend of authentic sound and contemporary style, Mzaca has been captivating audiences with heartfelt performances and meaningful lyrics. Drawing inspiration from rich cultural heritage and modern influences, the artist creates music that resonates with listeners across generations. Through dedication and artistic vision, Mzaca continues to make a significant impact in the music industry.',
    email: 'mzaca@gmail.com',
    phone: '+27 12 345 6789',
  },
  {
    id: 2,
    name: 'Artist1',
    image: 'https://mg.co.za/wp-content/uploads/2023/07/K.O-Pic-Individual-1-665x1000.jpg',
    bio: 'Musician and performer',
    email: 'artist1@gmail.com',
    phone: '+27 12 456 7890',
  },
  {
    id: 3,
    name: 'Artist2',
    image: 'https://www.musicinafrica.net/sites/default/files/styles/profile_images_large/public/images/artist_profile/201706/xabainsofarsoundglasgow.jpg?itok=Z2NW6_fx',
    bio: 'Recording artist',
    email: 'artist2@gmail.com',
    phone: '+27 12 567 8901',
  },
  {
    id: 4,
    name: 'Artist3',
    image: 'https://lh3.googleusercontent.com/UfX0LWenf_uHM1ZrpHTeHXtp36ItZyDeaOxhdtjrxI09o6YxRq-Y9n4rSSgmcWfRsevW58_bAcno-D73XvpuoVGeDmCnIVTB6494gtZkOtG1iXxN=s750',
    bio: 'Professional musician',
    email: 'artist3@gmail.com',
    phone: '+27 12 678 9012',
  },
  {
    id: 5,
    name: 'Random Artist',
    image: '/th.jpg',
    bio: 'Upcoming talented artist',
    email: 'random@gmail.com',
    phone: '+27 12 789 0123',
  },
]

// Songs data
export const songs = [
  {
    id: 1,
    name: 'Umenzi',
    artist: 'Mzaca',
    artistId: 1,
    image: '/th.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    name: 'Ziyawa',
    artist: 'Mzaca',
    artistId: 1,
    image: '/th.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    name: 'Random Song',
    artist: 'Random Artist',
    artistId: 5,
    image: '/th.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    name: 'Song 1',
    artist: 'Artist1',
    artistId: 2,
    image: 'https://mg.co.za/wp-content/uploads/2023/07/K.O-Pic-Individual-1-665x1000.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 5,
    name: 'Song 2',
    artist: 'Artist2',
    artistId: 3,
    image: 'https://www.musicinafrica.net/sites/default/files/styles/profile_images_large/public/images/artist_profile/201706/xabainsofarsoundglasgow.jpg?itok=Z2NW6_fx',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 6,
    name: 'Song 3',
    artist: 'Artist3',
    artistId: 4,
    image: 'https://lh3.googleusercontent.com/UfX0LWenf_uHM1ZrpHTeHXtp36ItZyDeaOxhdtjrxI09o6YxRq-Y9n4rSSgmcWfRsevW58_bAcno-D73XvpuoVGeDmCnIVTB6494gtZkOtG1iXxN=s750',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
]

export const models = [
  {
    id: 1,
    name: 'model1',
    image: 'https://www.themodelbuilders.co.uk/wp-content/uploads/2021/08/shutterstock_1795860640-scaled.jpg',
    bio: 'Professional model with extensive experience in fashion photography and commercial campaigns. Specializes in editorial work and brand representation. Known for versatility and ability to adapt to various creative concepts and styles.',
    email: 'model1@gmail.com',
    phone: '+27 11 234 5678',
  },
  {
    id: 2,
    name: 'model2',
    image: '/Components/model3.jpg',
    bio: 'Fashion model specializing in high-end editorial and runway shows. Works with leading fashion brands and designers. Expertise includes couture, ready-to-wear, and avant-garde fashion photography.',
    email: 'model2@gmail.com',
    phone: '+27 11 345 6789',
  },
  {
    id: 3,
    name: 'model3',
    image: '/Components/model2.jpg',
    bio: 'Commercial model with a strong portfolio in advertising and product photography. Experienced in lifestyle, beauty, and corporate campaigns. Brings authenticity and professionalism to every project.',
    email: 'model3@gmail.com',
    phone: '+27 11 456 7890',
  },
  {
    id: 4,
    name: 'model4',
    image: '/Components/model1.jpg',
    bio: 'Runway model with international experience in fashion weeks and designer showcases. Known for strong presence and ability to bring designer visions to life on the catwalk.',
    email: 'model4@gmail.com',
    phone: '+27 11 567 8901',
  },
]

export const events = [
  {
    id: 1,
    title: 'Cities are crowded',
    date: 'October 29, 2025',
    image: 'https://picsum.photos/id/188/720/400',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Mountains are alone',
    date: 'October 29, 2025',
    image: 'https://picsum.photos/id/1016/720/400',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Lakes are silent',
    date: 'October 29, 2025',
    image: 'https://picsum.photos/id/1011/720/400',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Past Event 1',
    date: 'September 15, 2024',
    image: 'https://picsum.photos/id/188/720/400',
    description: 'Past event description',
    status: 'past',
  },
  {
    id: 5,
    title: 'Past Event 2',
    date: 'August 20, 2024',
    image: 'https://picsum.photos/id/1016/720/400',
    description: 'Past event description',
    status: 'past',
  },
  {
    id: 6,
    title: 'Past Event 3',
    date: 'July 10, 2024',
    image: 'https://picsum.photos/id/1011/720/400',
    description: 'Past event description',
    status: 'past',
  },
]

// News items for home page slider
export const newsItems = [
  {
    id: 1,
    title: 'New Album Release Coming Soon',
    description: 'Get ready for the most anticipated album of the year. Featuring collaborations with top artists.',
    date: 'March 15, 2025',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    link: '#',
  },
  {
    id: 2,
    title: 'Upcoming Concert Tour Announcement',
    description: 'Join us for an unforgettable experience across major cities. Tickets available now.',
    date: 'March 10, 2025',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    link: '#',
  },
  {
    id: 3,
    title: 'Model Fashion Week Highlights',
    description: 'Our models stole the show at this year\'s fashion week. Check out the stunning collections.',
    date: 'March 5, 2025',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    link: '#',
  },
  {
    id: 4,
    title: 'Artist Collaboration Project',
    description: 'Exciting new collaboration between our top artists. Something amazing is coming.',
    date: 'February 28, 2025',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    link: '#',
  },
]

// Gallery images for model detail page
export const modelGalleryImages = [
  'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg',
  'https://images.unsplash.com/photo-1689217634234-38efb49cb664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  'https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
  'https://cdn.devdojo.com/images/june2023/mountains-10.jpeg',
  'https://cdn.devdojo.com/images/june2023/mountains-06.jpeg',
  'https://images.pexels.com/photos/1891234/pexels-photo-1891234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
  'https://images.pexels.com/photos/4256852/pexels-photo-4256852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
]

