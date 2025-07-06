from jinja2 import Template

songs = [
    {
        "title": "Easy To Be Free",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "easy-to-be-free.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "Blue Food",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "blue-food.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "A You're Adorable",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "a-youre-adorable.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "My Dame Had a Lame Tame Crane",
        "instrumentation": "Duo only",
        "pdf": None,
        "html": "my-dame.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "Who's Pigs Be These",
        "instrumentation": "Duo only",
        "pdf": None,
        "html": "whos-pigs.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "The Green Grass Grew All Around",
        "instrumentation": "Duo only?",
        "pdf": None,
        "html": "the-green-grass.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "Be Kind To You",
        "instrumentation": "Full band",
        "pdf": "/pdf/be-kind.pdf",
        "html": None,
        "audio": None,
        "notes": "Our only jazz song, this would work with just a duo as well",
    },
    {
        "title": "The Manatee Song",
        "instrumentation": "Full band",
        "pdf": "/pdf/manatee.pdf",
        "html": "manatee.html",
        "audio": "/audio/2025-07-06-manatee.m4a",
        "notes": None,
    },
    {
        "title": "Space Cats",
        "instrumentation": "Full band",
        "pdf": "/pdf/space-cats.pdf",
        "html": "space-cats.html",
        "audio": "/audio/2025-07-06-space-cats.m4a",
        "notes": None,
    },
    {
        "title": "The Duck and the Kangaroo",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "duck-and-kangaroo.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "Down by a Castle",
        "instrumentation": "Duo only",
        "pdf": None,
        "html": "down-by-a-castle.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "I'm Tired (But I Just Can't Sleep)",
        "instrumentation": "Full band",
        "pdf": "/pdf/cant-sleep.pdf",
        "html": "cant-sleep.html",
        "audio": "/audio/2025-07-06-tired.m4a",
        "notes": None,
    },
    {
        "title": "Green Goo",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "green-goo.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "King of the Road",
        "instrumentation": "Full band",
        "pdf": None,
        "html": None,
        "audio": None,
        "notes": None,
    },
    {
        "title": "The Fox",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "the-fox.html",
        "audio": None,
        "notes": None,
    },
    {
        "title": "Hope Machine",
        "instrumentation": "Full band",
        "pdf": None,
        "html": "hope-machine.html",
        "audio": None,
        "notes": None,
    },
]

def instrumentation_color(instr):
    if "Duo" in instr:
        return "bg-yellow-50"
    elif "Full" in instr:
        return "bg-blue-50"
    return "bg-white"

for song in songs:
    song["color_class"] = instrumentation_color(song["instrumentation"])

with open("other.html") as f:
    other_html = f.read()

page_template = Template("""
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/css/output.css" rel="stylesheet" />
  </head>
  <body>
    <div class="container mx-auto px-4">
      <h1 class="mt-4 text-2xl font-bold">Set List</h1>

      <!-- Mobile Cards View -->
      <div class="block sm:hidden mt-4 space-y-4">
        {% for song in songs %}
        <div class="border rounded p-4 shadow {{ song.color_class }}">
          <h2 class="text-lg font-semibold">{{ song.title }}</h2>
          <p class="text-sm"><strong>Instrumentation:</strong> {{ song.instrumentation }}</p>
          {% if song.pdf and song.html %}
            <p>
              <a class="text-blue-600" href="{{ song.pdf }}">PDF</a> |
              <a class="text-blue-600" href="{{ song.html }}">HTML</a>
            </p>
          {% elif song.pdf %}
            <p><a class="text-blue-600" href="{{ song.pdf }}">PDF</a></p>
          {% elif song.html %}
            <p><a class="text-blue-600" href="{{ song.html }}">HTML</a></p>
          {% endif %}
          {% if song.audio %}<audio class="mt-2 mb-2" controls src="{{ song.audio }}"></audio>{% endif %}
          {% if song.notes %}<p class="mt-2 text-sm"><strong>Notes:</strong> {{ song.notes }}</p>{% endif %}
        </div>
        {% endfor %}
      </div>

      <!-- Desktop Table View -->
      <div class="hidden sm:block mt-6 overflow-x-auto">
        <table class="w-full border border-gray-300 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-3 py-2 text-left">Title</th>
              <th class="border px-3 py-2 text-left">Instrumentation</th>
              <th class="border px-3 py-2 text-left">PDF</th>
              <th class="border px-3 py-2 text-left">HTML</th>
              <th class="border px-3 py-2 text-left">Audio</th>
              <th class="border px-3 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {% for song in songs %}
            <tr class="{{ song.color_class }}">
              <td class="border px-3 py-2">{{ song.title }}</td>
              <td class="border px-3 py-2">{{ song.instrumentation }}</td>
              <td class="border px-3 py-2">{% if song.pdf %}<a class="text-blue-600" href="{{ song.pdf }}">PDF</a>{% endif %}</td>
              <td class="border px-3 py-2">{% if song.html %}<a class="text-blue-600" href="{{ song.html }}">HTML</a>{% endif %}</td>
              <td class="border px-3 py-2">{% if song.audio %}<audio controls src="{{ song.audio }}"></audio>{% endif %}</td>
              <td class="border px-3 py-2">{{ song.notes or '' }}</td>
            </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>

      <!-- Additional HTML -->
      <div class="mt-8">
        {{ other_html | safe }}
      </div>

    </div>
  </body>
  <script src="../js/qrcode.min.js"></script>
  <script src="../js/bundle.js"></script>
</html>
""")

html = page_template.render(songs=songs, other_html=other_html)

with open("index.html", "w") as f:
    f.write(html)

print("✅ Full setlist HTML page generated.")
