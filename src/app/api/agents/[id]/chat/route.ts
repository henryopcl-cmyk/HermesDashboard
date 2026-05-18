import { agents } from "@/lib/mock-data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "message is required" },
      { status: 400 }
    );
  }

  // Mock response — replace with real NVIDIA API call to your server
  const mockResponses: Record<string, string> = {
    mercury: `[Mercury] Mensaje recibido. He procesado tu solicitud y notificado a los sistemas relevantes. Hay 3 notificaciones pendientes en la cola.`,
    apollo: `[Apollo] Analisis completado. Los datos muestran un incremento del 12% en requests esta semana. El patron sugiere mayor actividad entre 10am-2pm.`,
    athena: `[Athena] Investigacion en progreso. He recopilado informacion de 5 fuentes distintas. El resumen estara listo en breve.`,
    prometheus: `[Prometheus] Workflow ejecutado. La tarea de automatizacion se completo en 2.3s. Todos los procesos dependientes fueron notificados.`,
    iris: `[Iris] Entendido. He revisado la base de conocimiento y encontre 3 articulos relevantes para tu consulta. Te puedo asistir con mas detalles.`,
    atlas: `[Atlas] Alerta: El servicio esta en recuperacion. Ultimo health check fallo hace 2h. Intentando reconexion...`,
  };

  const reply = mockResponses[id] || `[${agent.name}] Respuesta procesada.`;

  return NextResponse.json({
    id: `msg-${Date.now()}`,
    role: "assistant",
    content: reply,
    timestamp: new Date().toISOString(),
    agentId: id,
  });
}
