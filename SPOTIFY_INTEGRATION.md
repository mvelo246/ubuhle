# Spotify Web Playback SDK Integration

## ✅ What's Been Added

1. **Spotify SDK Script** - Added to `index.html`
2. **SpotifyContext** - Manages Spotify player state
3. **MusicPlayer Component** - Now supports both Spotify and regular audio
4. **Automatic Detection** - Detects if a song is a Spotify track

---

## How It Works

### For Spotify Tracks:
- If `audioUrl` is a Spotify URI (`spotify:track:...`) or Spotify URL (`https://open.spotify.com/track/...`)
- The player automatically uses Spotify Web Playback SDK
- Provides high-quality playback through Spotify

### For Regular Audio:
- If `audioUrl` is a regular MP3/audio URL
- Falls back to HTML5 audio player
- Works as before

---

## Adding Songs

### Option 1: Spotify Track
When adding a song in the dashboard, use one of these formats:

**Spotify URI:**
```
spotify:track:4iV5W9uYEdYUVa79Axb7Rh
```

**Spotify URL:**
```
https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
```

The player will automatically:
- Convert URL to URI if needed
- Use Spotify SDK for playback
- Show Spotify track info

### Option 2: Regular Audio File
Use any regular audio URL:
```
https://example.com/audio/song.mp3
```

The player will use HTML5 audio.

---

## Important Notes

### Spotify Token
- The current token will **expire** (Spotify tokens are temporary)
- For production, you should:
  1. Implement Spotify OAuth flow
  2. Get tokens from your backend
  3. Store tokens securely
  4. Refresh tokens when they expire

### Spotify Premium Required
- Spotify Web Playback SDK requires a **Spotify Premium** account
- Free accounts cannot use the SDK

### Token Location
Currently the token is in: `src/context/SpotifyContext.jsx`
- **Line 23:** `const SPOTIFY_TOKEN = '...'`
- Update this when the token expires

---

## Testing

1. **Add a Spotify track:**
   - Go to Dashboard → Artists
   - Click "Songs" on an artist
   - Add song with Spotify URL/URI in `audioUrl` field
   - Example: `https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`

2. **Add a regular audio:**
   - Use any MP3 URL in `audioUrl` field
   - Example: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`

3. **Visit artist detail page:**
   - Songs should play using the appropriate player
   - Spotify tracks use Spotify SDK
   - Regular audio uses HTML5 player

---

## Features

✅ Automatic detection of Spotify vs regular audio
✅ Seamless fallback to HTML5 audio
✅ Play/pause controls work for both
✅ Seek/scrub works for both
✅ Progress bar updates for both
✅ No breaking changes to existing functionality

---

## Future Improvements

1. **OAuth Integration:**
   - Add Spotify login button
   - Get tokens from Spotify API
   - Store tokens securely

2. **Token Management:**
   - Backend endpoint to get/refresh tokens
   - Automatic token refresh
   - User-specific tokens

3. **Playlist Support:**
   - Queue multiple songs
   - Play next/previous
   - Shuffle/repeat

---

## Current Status

✅ Spotify SDK integrated
✅ Player detects Spotify tracks
✅ Fallback to HTML5 audio works
✅ All controls functional
⚠️ Token will expire (needs refresh mechanism)
