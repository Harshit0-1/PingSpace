import { ReactNode, useMemo, useState } from "react";

type Room = { name: string };

type SidebarProps = {
  rooms: Room[];
  onSelectRoom: (roomName: string) => void;
  onNewRoom?: () => void;
  isOpen?: boolean;
  headerSlot?: ReactNode;
  activeRoomName?: string;
};

export default function Sidebar({ rooms, onSelectRoom, onNewRoom, isOpen, headerSlot, activeRoomName }: SidebarProps) {
  const [query, setQuery] = useState("");
  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter((r) => r.name.toLowerCase().includes(q));
  }, [rooms, query]);

  return (
    <aside className={"sidebar" + (isOpen ? " open" : "") }>
      <div className="sidebar-header">
        {headerSlot ?? <div className="brand">PingSpace</div>}
      </div>
      <div className="tabs">
        <button className="tab active">Groups</button>
        <button className="tab">DM</button>
      </div>
      <div style={{ padding: "8px 12px" }}>
        <input
          className="search"
          placeholder="Search groups & DMs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="channel-list">
        {filteredRooms.map((room) => (
          <div
            key={room.name}
            className={"channel-item" + (room.name === activeRoomName ? " active" : "")}
            onClick={() => onSelectRoom(room.name)}
            data-name={room.name}
          >
            {room.name}
          </div>
        ))}
        {onNewRoom && (
          <div className="channel-item" onClick={onNewRoom}>
            New room
          </div>
        )}
      </div>
    </aside>
  );
}


