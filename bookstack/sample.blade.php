@php

    use Firebase\JWT\JWT;

    $secretKey = env('PDF_IMPORTER_JWT_SECRET', 'your_super_secret_key_shared_with_bookstack');

    $payload = [
        'iat' => time(),
        'exp' => time() + (60 * 60), // Token expires in 60 minutes
        'book_id' => $book->id,
        'user_id' => user()->id,
        'user_name' => user()->name,
    ];

    $jwt = JWT::encode($payload, $secretKey, 'HS256');

    $baseImporterUrl = env('PDF_IMPORTER_URL', 'http://localhost:5173');
    $importerUrl = rtrim($baseImporterUrl, '/') . '/?token=' . $jwt;

@endphp

@if(userCan(\BookStack\Permissions\Permission::PageCreate, $book))
    <a href="{{ $importerUrl }}" data-shortcut="new" class="icon-list-item">
        <span>@icon('add')</span>
        <span>Import PDF as Page</span>
    </a>
@endif