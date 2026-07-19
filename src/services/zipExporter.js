import JSZip from 'jszip';

export async function exportProjectToZip(project) {
  const zip = new JSZip();

  function addNodeToZip(node, currentFolder) {
    if (node.type === 'file') {
      currentFolder.file(node.name, node.content || '');
    } else if (node.type === 'folder' && node.children) {
      const newFolder = currentFolder.folder(node.name);
      for (const child of node.children) {
        addNodeToZip(child, newFolder);
      }
    }
  }

  const rootFolder = zip.folder(project.name.toLowerCase().replace(/[^a-z0-9]/g, '-'));

  if (project.folderStructure) {
    for (const node of project.folderStructure) {
      addNodeToZip(node, rootFolder);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-starter.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
