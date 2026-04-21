import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 🔐 AUTH
  const [user, setUser] = useState(null);

  // 🔗 CONNECTIONS
  const [connections, setConnections] = useState([]);

  // 💬 MESSAGES
  const [messages, setMessages] = useState([]);

  // 📸 PHOTOS
  const [photos, setPhotos] = useState([]);

  // 📅 DATES
  const [dates, setDates] = useState([]);

  // invites
  const [invites, setInvites] = useState([]);

  const [loading, setLoading] = useState(true);

  // -------------------------
  // 🔐 AUTH INIT
  // -------------------------
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // -------------------------
  // 🔗 FETCH CONNECTIONS
  // -------------------------
  const fetchConnections = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("connections")
      .select("*")
      .or(`user1.eq.${user.id},user2.eq.${user.id}`);

    setConnections(data || []);
  };

  // fetch invite
  const fetchInvites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .or(`sender.eq.${user.id},receiver_email.eq.${user.email}`);

    if (error) {
      console.log(error);
      return;
    }

    setInvites(data || []);
  };

  // -------------------------
  // 💬 FETCH MESSAGES
  // -------------------------
  const fetchMessages = async (connectionId) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("connection_id", connectionId)
      .order("created_at");

    setMessages(data || []);
  };

  // -------------------------
  // 💬 SEND MESSAGE
  // -------------------------
  const sendMessage = async (connectionId, content) => {
    await supabase.from("messages").insert({
      connection_id: connectionId,
      sender: user.id,
      content,
    });
  };

  // -------------------------
  // 📸 UPLOAD PHOTO
  // -------------------------
  const uploadPhoto = async (file, connectionId) => {
    const filePath = `${connectionId}/${user.id}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("connection-photos")
      .upload(filePath, file);

    if (error) return;

    const { data } = supabase.storage
      .from("connection-photos")
      .getPublicUrl(filePath);

    await supabase.from("photos").insert({
      connection_id: connectionId,
      user_id: user.id,
      url: data.publicUrl,
    });
  };

  // -------------------------
  // 📅 ADD DATE
  // -------------------------
  const addDate = async (connectionId, title, date) => {
    await supabase.from("important_dates").insert({
      connection_id: connectionId,
      title,
      date,
      created_by: user.id,
    });
  };

  // -------------------------
  // 🔁 AUTO LOAD
  // -------------------------
  useEffect(() => {
    if (user) {
      fetchConnections();
      fetchInvites()
    }
  }, [user]);

  return (
    <StoreContext.Provider
      value={{
        user,
        loading,
        connections,
        messages,
        photos,
        dates,
        invites,
        fetchInvites,
        fetchConnections,
        fetchMessages,
        sendMessage,
        uploadPhoto,
        addDate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);