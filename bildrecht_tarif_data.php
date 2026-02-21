<?php
header('Content-Type: application/json; charset=utf-8');

$cacheFile = __DIR__ . '/data/bildrecht_tarif_cache.json';
$cacheTtl = 60 * 60 * 24 * 7;

function read_cache(string $path): ?array {
  if (!is_file($path)) {
    return null;
  }
  $raw = file_get_contents($path);
  if ($raw === false) {
    return null;
  }
  $data = json_decode($raw, true);
  return is_array($data) ? $data : null;
}

function should_refresh(string $path, int $ttl): bool {
  if (!is_file($path)) {
    return true;
  }
  $mtime = filemtime($path);
  if ($mtime === false) {
    return true;
  }
  return (time() - $mtime) > $ttl;
}

function make_absolute_url(string $href): string {
  if (str_starts_with($href, 'http://') || str_starts_with($href, 'https://')) {
    return $href;
  }
  if (str_starts_with($href, '/')) {
    return 'https://bildrecht.at' . $href;
  }
  return 'https://bildrecht.at/' . ltrim($href, '/');
}

function scrape_bildrecht_tarife(): array {
  $start = 'https://bildrecht.at/bildnutzerinnen/tarife/';
  $ctx = stream_context_create([
    'http' => [
      'timeout' => 5,
      'user_agent' => 'Mozilla/5.0 (compatible; curator-planning-bot/1.0)'
    ],
    'ssl' => [
      'verify_peer' => true,
      'verify_peer_name' => true,
    ],
  ]);

  $html = @file_get_contents($start, false, $ctx);
  if ($html === false) {
    throw new RuntimeException('Startseite konnte nicht geladen werden.');
  }

  $dom = new DOMDocument();
  @$dom->loadHTML($html);
  $xpath = new DOMXPath($dom);

  $urls = [];
  foreach ($xpath->query('//a[@href]') as $link) {
    $href = trim((string) $link->getAttribute('href'));
    if ($href === '') {
      continue;
    }
    $absolute = make_absolute_url($href);
    if (str_contains($absolute, '/bildnutzerinnen/tarife/') && rtrim($absolute, '/') !== rtrim($start, '/')) {
      $urls[$absolute] = true;
    }
  }

  $rows = [];
  foreach (array_keys($urls) as $url) {
    $subHtml = @file_get_contents($url, false, $ctx);
    if ($subHtml === false) {
      continue;
    }

    $subDom = new DOMDocument();
    @$subDom->loadHTML($subHtml);
    $subXpath = new DOMXPath($subDom);

    $h1Node = $subXpath->query('//h1')->item(0);
    $kategorie = $h1Node ? trim(preg_replace('/\s+/', ' ', $h1Node->textContent)) : 'Tarif';

    foreach ($subXpath->query('//table') as $table) {
      $headerNodes = $subXpath->query('.//tr[1]/*[self::th or self::td]', $table);
      $einheit = '';
      if ($headerNodes->length > 1) {
        $einheit = trim(preg_replace('/\s+/', ' ', $headerNodes->item(1)->textContent));
      }

      $section = '';
      $cursor = $table->previousSibling;
      while ($cursor !== null) {
        if ($cursor instanceof DOMElement && in_array(strtolower($cursor->tagName), ['h2', 'h3', 'h4', 'h5'], true)) {
          $section = trim(preg_replace('/\s+/', ' ', $cursor->textContent));
          break;
        }
        $cursor = $cursor->previousSibling;
      }

      foreach ($subXpath->query('.//tr[position()>1]', $table) as $tr) {
        $cells = [];
        foreach ($subXpath->query('./*[self::th or self::td]', $tr) as $cell) {
          $cells[] = trim(preg_replace('/\s+/', ' ', $cell->textContent));
        }
        if (!$cells || trim(implode('', $cells)) === '') {
          continue;
        }

        $rows[] = [
          'kategorie' => $kategorie,
          'abschnitt' => $section,
          'eintrag' => $cells[0] ?? '',
          'betrag_eur' => $cells[1] ?? '',
          'einheit' => $einheit,
          'quelle' => $url,
        ];
      }
    }
  }

  return [
    'generated_at' => date('Y-m-d H:i'),
    'rows' => $rows,
  ];
}

$payload = null;
if (should_refresh($cacheFile, $cacheTtl)) {
  try {
    $payload = scrape_bildrecht_tarife();
    if (!is_dir(dirname($cacheFile))) {
      mkdir(dirname($cacheFile), 0775, true);
    }
    file_put_contents($cacheFile, json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  } catch (Throwable $e) {
    $payload = read_cache($cacheFile);
  }
} else {
  $payload = read_cache($cacheFile);
}

if (!is_array($payload)) {
  $payload = [
    'generated_at' => null,
    'rows' => [],
  ];
}

echo json_encode($payload, JSON_UNESCAPED_UNICODE);
