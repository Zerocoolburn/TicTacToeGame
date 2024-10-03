import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = 'https://your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    let { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('wins', { ascending: false });
    if (error) console.error('Error fetching leaderboard:', error);
    else setLeaderboard(data);
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.id}>
            {player.player_name}: {player.wins} wins
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
