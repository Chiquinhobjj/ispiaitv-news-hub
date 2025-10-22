import { Calendar, Clock } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface LinhaDoTempoProps {
  events: TimelineEvent[];
}

const LinhaDoTempo = ({ events }: LinhaDoTempoProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-xl">Linha do Tempo</h3>
      </div>

      <div className="relative border-l-2 border-primary/30 pl-6 space-y-8">
        {events.map((event, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background shadow-md" />
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <time dateTime={event.date}>{event.date}</time>
              </div>
              <h4 className="font-semibold text-lg">{event.title}</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinhaDoTempo;
