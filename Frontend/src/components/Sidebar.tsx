import { ReactNode, useMemo, useState } from "react";
import ServerSidebar from "./ServerSidebar";

type Room = { name: string; id: string | number };
type Server = { name: string; id: string; owner_id: string };
// removed unused Server type

type SidebarProps = {
  rooms: Room[];
  onSelectRoom: (roomName: string, id: any) => void;
  onNewRoom?: () => void;
  isOpen?: boolean;
  headerSlot?: ReactNode;
  activeRoomName?: string;
  server?: Server[];
};

export default function Sidebar({
  rooms,
  onSelectRoom,
  onNewRoom,
  isOpen,
  headerSlot,
  activeRoomName,
  server,
}: SidebarProps) {
  const [query, setQuery] = useState("");

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter((r) => r.name.toLowerCase().includes(q));
  }, [rooms, query]);

  return (
    <aside className={"sidebar" + (isOpen ? " open" : "")}>
      <div className="sidebar-row">
        <ServerSidebar server={server} />
        <div className="sidebar-content">
          <div className="sidebar-header">
            {headerSlot ?? <div className="brand">PingSpace</div>}
          </div>
          <div className="tabs">
            <button className="tab active">Text</button>
            <button className="tab">Voice</button>
          </div>
          <div style={{ padding: "8px 12px" }}>
            <input
              className="search"
              placeholder="Search groups & DMs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="section">
            <div className="section-title">TEXT CHANNELS</div>
          </div>
          <div className="channel-list">
            {filteredRooms.map((room) => (
              <div
                key={room.name}
                className={"channel-item" + (room.name === activeRoomName ? " active" : "")}
                onClick={() => onSelectRoom(room.name, room.id)}
                data-name={room.name}
                data-id={room.id}
              >
                <span className="channel-hash">#</span>
                <span className="channel-name">{room.name}</span>
              </div>
            ))}
            {onNewRoom && (
              <div className="channel-item" onClick={onNewRoom}>
                <span className="channel-hash">+</span>
                <span className="channel-name">Create channel</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
