<?php
/**
 * SEO Meta Tags Helper
 * Generates consistent, SEO-optimized meta tags and structured data
 */

if (!function_exists('generate_seo_meta')) {
    function generate_seo_meta(array $config = []): void {
        $defaults = [
            'title' => 'artbackstage',
            'description' => 'Planning and education tools for freelance curators and cultural practitioners.',
            'lang' => 'en',
            'canonical' => null,
            'og_image' => 'https://artbackstage.at/og-image.png',
            'og_type' => 'website',
            'alternate_lang' => null,
            'alternate_url' => null,
            'schema' => null,
        ];

        $config = array_merge($defaults, $config);

        // Title tag
        echo '<title>' . htmlspecialchars($config['title'], ENT_QUOTES, 'UTF-8') . '</title>' . "\n";

        // Meta description
        echo '<meta name="description" content="' . htmlspecialchars($config['description'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";

        // Open Graph tags for social sharing
        echo '<meta property="og:title" content="' . htmlspecialchars($config['title'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta property="og:description" content="' . htmlspecialchars($config['description'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta property="og:type" content="' . htmlspecialchars($config['og_type'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta property="og:image" content="' . htmlspecialchars($config['og_image'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta property="og:image:alt" content="' . htmlspecialchars($config['title'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";

        // Twitter Card tags
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:title" content="' . htmlspecialchars($config['title'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . htmlspecialchars($config['description'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        echo '<meta name="twitter:image" content="' . htmlspecialchars($config['og_image'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";

        // Canonical link
        if ($config['canonical']) {
            echo '<link rel="canonical" href="' . htmlspecialchars($config['canonical'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        }

        // Hreflang for language alternates
        if ($config['alternate_lang'] && $config['alternate_url']) {
            echo '<link rel="alternate" hreflang="' . htmlspecialchars($config['alternate_lang'], ENT_QUOTES, 'UTF-8') . '" href="' . htmlspecialchars($config['alternate_url'], ENT_QUOTES, 'UTF-8') . '" />' . "\n";
        }

        // Structured data (JSON-LD)
        if ($config['schema']) {
            echo '<script type="application/ld+json">' . "\n";
            echo json_encode($config['schema'], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n";
            echo '</script>' . "\n";
        }
    }
}

if (!function_exists('get_site_schema')) {
    function get_site_schema(?string $page_title = null, ?string $page_description = null): array {
        $base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => 'artbackstage',
            'description' => $page_description ?? 'Planning and education tools for freelance curators and cultural practitioners.',
            'url' => $base_url,
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => [
                    '@type' => 'EntryPoint',
                    'urlTemplate' => $base_url . '/search?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];
    }
}
